let express = require('express');
let bodyparser = require('body-parser');
let mysql = require('./db.js');
let app = express();
let path = require('path');
let cors = require('cors');

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }))


app.get('/getData', (req,res)=>{
    mysql.query('select * from test',(result)=>{
        res.json(result)
    })
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