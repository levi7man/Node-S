const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
//const port = process.env.port || 3000;

var app = express();
app.set('port', (process.env.PORT || 3000));

hbs.registerPartials(__dirname +'/views/partials');
app.set('View engines', hbs);
app.use(express.static(__dirname + '/Public'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('ScreamIt', (text)=>{
    return text.toUpperCase();
});

app.get("/Projects",(req, res)=>{
    res.render('Projects.hbs',{
        pageTitle: "Projects"
    });
});

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('Server.log', log + '\n', (err)=>{
        if (err) {
            console.log('Unable to append server log');
        }
    });
     next();
});


app.get('/', (req, res) => {
    res.render('Index.hbs',{
        pageTitle: 'Home Page',
        welcome: 'Welcome to my site' 
    });
});

app.get('/About', (req, res)=>{
    res.render('About.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res)=>{

    res.send({
        ErrorMessage: 'Unable to handle request'
    });
});

app.listen(app.get('port'), ()=>{
    console.log(`the port in use is: ${app.get('port')}`);
});
