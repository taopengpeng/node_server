let mysql = require('mysql');

let db = {};
db.query = (sql,fn)=> {
    let connection = mysql.createConnection({
        host: '116.62.20.192',
        user: 'root',
        password: 'root',
        port: '3306',
        database: 'tpp_test'
    });
    connection.connect((err)=>{
        if(err){
            console.log(err,'test');
        } else {
            console.log('connect succeed!');
        }
    });
    if (!sql) return;
    connection.query(sql,(err,rows,fields)=>{
        if(err){
            console.log(err);
            fn(err)
            return
        }
        fn(rows);
    })
    connection.end((err)=>{
        if (err)  {
            return;
        }else {
            console.log('-------closed-------')
        }
    })
}

module.exports = db;
