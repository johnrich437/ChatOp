var express = require('express');
var bodyParser = require('body-parser')
var url = require('url');
var fs = require('fs');
var path = require('path');
var autoIncrement = require("mongoose-auto-increment");
var mongoose = require('mongoose');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser'); // the session is stored in a cookie,
var MongoStore = require('connect-mongo')(expressSession);

var urlConncet = 'mongodb://localhost:27017/learning';


var db = mongoose.connect(urlConncet);

autoIncrement.initialize(db);
var app = express();


var messageObjectSchema = new mongoose.Schema({
    _id: Number,
    content: String,
    username: String
});
messageObjectSchema.plugin(autoIncrement.plugin,'messageObject')
// Compile a 'Movie' model using the movieSchema as the structure.
// Mongoose also creates a MongoDB collection called 'Movies' for these documents.
var messageObject = db.model('messageObject', messageObjectSchema, 'messages')

fs.writeFile('messages.json', "[]", 'utf-8', function (err) {
    if (err) throw err;
    console.log('filelistAsync complete');
});

app.use(bodyParser.json());

app.use(bodyParser());
app.use(cookieParser());

app.use(expressSession({
    secret: "session secret" ,
    store:new MongoStore({
        db: 'learning',
        host: 'localhost',
        port: 27017,
        collection: 'session',
        auto_reconnect:true
    })
}));

var id = 1;
var messages = [];

var getMessages = function (req, res) {

    var url_parts = url.parse(req.url, true);
    var messagesNew = [];
    messageObject.find({_id:{ $gt: parseInt(url_parts.query.id) } }).exec(function (err, messages) {
        if (err) return console.error(err);
        res.send(messages);
    });
    /*    if (messages.length > 4) {
     messages = messages.slice(messages.length - 5, messages.length + 1)
     }
     if (id > parseInt(url_parts.query.id) + 5) {
     fs.readFile('messages.json', 'utf-8', function (err, data) {
     if (err) throw err;
     var messagesFormFile = JSON.parse(data);
     messagesFormFile.forEach(function (message) {
     if (message.id > url_parts.query.id || url_parts.query.id == 0) {
     messagesNew.push(message);
     }
     });
     res.send(messagesNew);
     });

     }
     else {
     messages.forEach(function (message) {
     if (message.id > url_parts.query.id || url_parts.query.id == 0) {
     messagesNew.push(message);
     }
     });
     res.send(messagesNew);

     }*/
};

var sendMessage = function (req, res) {
    var content = req.body.content;
    var sender = req.session.username;
    console.log(id);
    if (content) {
        var mes = new messageObject({
            content: content,
            username: sender
        });
        var messageObj = {
            id: id,
            content: content,
            username: sender
        }
        messages.push(messageObj);
        id++;
        mes.save(function (err) {
            if (err) {
                return err;
            }
            else {
                console.log("Post saved");
            }
        });

        res.send("ok");
        return;
    }
    res.send("please send a message");
}

var insertDocument = function (db, doc, callback) {
    db.collection('messages').insertOne(doc, function (err, result) {
        console.log("Inserted a document into the restaurants collection.");
        callback(result);
    });
};
var login = function (req, res) {
    req.session.username = req.body.username;
    res.send("{\"message\":\"ok\"}");

}

var homePage = function (req, res) {
    if (!req.session.username) {
        res.redirect("/login")
    }
    else{
        res.sendfile( './public/index.html' );
    }
}

app.get('/', homePage);
app.post('/login', login)
app.get('/getMessages', getMessages);
app.post('/sendMessage', sendMessage);

app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));

//---------------------------------
// All other URLs -> show index.html
//---------------------------------

app.get( '*', function( req, res )
{
    res.sendfile( './public/index.html' );
});
app.listen(3000);
