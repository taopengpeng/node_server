let express = require('express');
let bodyparser = require('body-parser');
let mysql = require('./db.js');
let app = express();
let path = require('path');
let cors = require('cors');
let session = require('express-session')
let cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }))
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*1
    }
}))

app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", req.headers.origin); //需要显示设置来源
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Credentials",true); //带cookies7     res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

app.use(function(req, res, next) {
	// 除/login之外的都拦截
	if (req.url == '/login') {
		next()
	} else {
		//判断有没有登陆失效
		if (req.session && req.session.user) {
			next();
		} else {
			res.json({data:'login error'})
		}
	}
});

app.post('/login',(req,res)=>{
	if(req.body.user == 'admin' && req.body.password == '123'){
		req.session.user = req.body.user; // 登录成功，设置 session
		console.log(req.session)
		console.log(req.cookies)
		res.json({data: 'success'});
	}
	else{
		res.json({ret_code : 1, ret_msg : '账号或密码错误'});// 若登录失败，重定向到登录页面
	}
})

app.get('/getData', (req,res)=>{
    console.log(req.session)
	console.log(req.cookies)
    if(req.session.user){
		res.json({msg: 'success'})
    }else {
		res.json({msg: 'error'})
    }
    // mysql.query('select * from test',(result)=>{
    //     res.json(result)
    // })
})

app.get('/getDetail', (req,res)=>{
    mysql.query(`select * from detail where uid='${req.query.id}';`,(result)=>{
        res.json(result)
    })
})



app.post('/setData',(req,res)=>{
    mysql.query(`insert into test(name,sex,age) values('${req.body.name}',${req.body.sex},${req.body.age});`,(result)=>{
        console.log(111)
        if(result.errno) {
            res.json({status: 1,data: result,msg: 'error'})
        } else {
            res.json({status: 200,data: [],msg: 'success'})
        }
    })

})

app.post('/delData',(req,res)=>{
    mysql.query(`delete from test where Id = ${req.body.id};`,(result)=>{
        console.log(111)
        if(result.errno) {
            res.json({status: 1,data: result,msg: 'error'})
        } else {
            res.json({status: 200,data: [],msg: 'success'})
        }
    })

})

app.post('/upData',(req,res)=>{
    mysql.query(`update test set name = '${req.body.name}',age='${req.body.age}',sex='${req.body.sex}' where Id = ${req.body.Id};`,(result)=>{
        if(result.errno) {
            res.json({status: 1,data: result,msg: 'error'})
        } else {
            res.json({status: 200,data: [],msg: 'success'})
        }
    })

})

app.listen(3000);