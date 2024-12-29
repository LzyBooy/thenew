//install: node js
//install web server package: express >npm install express
var express = require("express");
var server = express();
var bodyParser = require("body-parser");
const path = require("path");

//web root
server.use(express.static(__dirname));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded());

var fileUpload = require("express-fileupload");
server.use(fileUpload({defCharset:'utf8', defParamCharset:'utf8'}));


var DB = require("nedb-promises");
var ProfolioDB = DB.create(__dirname+"/profolio.db");
var ContactDB = DB.create(__dirname+"/contact.db");
 

 /*ProfolioDB.insert([
    {
        name: "野原新之助",
        image: "images/cartoon/178f7e887af00a01ec333f7287164e52.jpg",
        description: "野原新之助是《蠟筆小新》的主角，一名性格鮮明又搞笑的5歲幼稚園男孩。他的言行舉止天真又無厘頭，常常以一針見血的話語或出乎意料的行為製造笑點，但同時也展現了孩子特有的純真與善良。小新這個角色憑藉幽默和純真的特質深受全球觀眾喜愛。他的形象讓人們反思成人世界的矯情，並學會用孩子的眼光看待生活。"
      },
      {
        name: "櫻田妮妮",
        image: "images/cartoon/595363aa666c1bebe1afb654a462978e.jpg",
        description: "櫻田妮妮是《蠟筆小新》中野原新之助的同班同學，雙葉幼稚園向日葵班的重要角色之一。她的性格和小新形成鮮明對比，充滿戲劇張力的互動常為劇情帶來笑料和趣味。妮妮的角色塑造融入了許多「小大人」孩子的特質，既展現天真的一面，也反映了現實生活中部分孩子因過於成熟或敏感而產生的趣味衝突。她的暴力兔兔情節更成為動畫經典梗之一。"
      },
      {
        name: "風間徹",
        image: "images/cartoon/0deccd8b474725309803d11963bccba9.jpg",
        description: "風間徹是《蠟筆小新》中野原新之助的同班同學和好友之一。他是一個性格穩重又愛學習的小男孩，經常展現出超越同齡人的成熟，但與小新的搞笑互動形成強烈對比。風間徹作為故事中「優等生」的代表，經常在劇情中與小新的「反派性格」碰撞出笑料。他也代表了一部分過早成熟的孩子，表現出對責任和形象的過度關注，但同時保留了童心的一面。"
      },
      {
        name: "佐藤正男",
        image: "images/cartoon/a2bc7a4c7e7342ffa2ec737d8d9aaeb3.jpg",
        description: "佐藤正男是《蠟筆小新》中雙葉幼稚園向日葵班的一名學生，也是野原新之助的好友之一。他以天真、膽小和容易被欺負的性格著稱，但他的純真和偶爾的堅強也讓他成為觀眾心中的「可愛小天使」。正男代表了一類性格溫柔、天真的孩子，他的存在讓故事更加多元化和有趣。他經常成為朋友群中的「調和者」，也讓觀眾看到了小朋友之間最純真的一面。"
      },
      {
        name: "阿呆",
        image: "images/cartoon/74f9b84b6f7a03e200130595249b641b.jpg",
        description: "阿呆是《蠟筆小新》中雙葉幼稚園向日葵班的一名學生，也是小新的小夥伴之一。他以呆萌、慢條斯理和神秘的性格著稱，是班上的一個「特殊存在」。阿呆的角色雖然話少，但他的存在為故事增添了一層幽默感與神秘色彩。他代表了一種「無言勝有言」的幽默表達方式，讓觀眾在爆笑之餘也感受到孩子世界的純粹與有趣。"
      }
 ])*/

server.get("/services", (req, res)=>{
    //DB find
    var Services=[
        {icon: "fa-shopping-cart", heading:"E-Commerce", text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit."},
        {icon: "fa-laptop", heading:"Responsive Design", text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit."}
    ];
    res.send(Services);
});
server.get("/", (req, res)=>{
 res.sendFile(path.join(__dirname,'/home.html'))
 
});

server.get("/profolio", (req,res)=>{
      //DB
      ProfolioDB.find({}).then(results=>{
        if(results != null){
             res.send(results);
        }else{
            res.send("Error!");
        }
      })
})

server.post("/contact_me", (req,res)=>{
     ContactDB.insert(req.body);
     res.redirect("/contact_me.html");
})

server.listen(2000, ()=>{
    console.log("Server is running at port 2000.");
})