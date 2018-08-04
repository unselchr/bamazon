var inquirer=require("inquirer");
var sqlFormatter=require("sql-formatter");
var mysql = require("mysql");
require("dotenv").config();
var pd= require("pretty-data").pd;
var prettyjson = require('prettyjson');

var connection = mysql.createConnection({
    host:"localhost",
    port:process.env.port||3306,
    user: process.env.user||"root",
    password: process.env.password||"",
    database:"bamazon",
    //insecureAuth:true
});
//console.log(process.env);

connection.connect(function(err){
    if(err)throw err;
    console.log("connected as id:"+connection.threadID+"\n");
    sell();
});
function sell(){
    var products;
    connection.query("SELECT * FROM products",function(err,res){
        products=res;
        if(err)throw err;
        //console.log(res);
        console.log(prettyjson.render(res));
    })
    inquirer.prompt([
        {
            type:"input",
            name:"id",
            message:"Enter the id of the desired product"
        },{
            type:"input",
            name:"quantity",
            message:"How many would you like?"
        }
    ]).then(
        function(input){
        connection.query("SELECT * FROM products WHERE ?",[{"item_id":input.id}],
        function(err,res){
            if(err)throw err;
            console.log(prettyjson.render(res));
            if(input.quantity<=res[0].stock_quantity){
                connection.query("UPDATE products SET stock_quantity=stock_quantity-"+input.quantity+" WHERE item_id="+input.id),
                function(res,err){
                    if(err)throw err;
                    connection.end();
                }
            }
            else{
                console.log("Not enough of "+res[0].product_name+" to fulfil your order!");
                connection.end();
            }
        })
        
    })
    
}