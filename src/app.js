const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

const path = process.env.PORT

//define paths for hbs config
const publicDirPath = path.join(__dirname,'../public')
const partialsPath = path.join(__dirname,'../views/partials');

//set up static directoy to serve
app.use(express.static(publicDirPath));

//set up handlebars and paths
app.set('view engine','hbs');
hbs.registerPartials(partialsPath);


app.get('',(req,res)=>{
    res.render('index',{
        title:'Home',
        nameF:'Preet'
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        details:'This page is to help you',
        nameF:'Preet'
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        details:'this page is to guide you',
        nameF:'Preet'
    });
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'please provide an adress'
        })
    }

    geocode(req.query.address,(error,response)=>{
       
            forecast(error,response,(data)=>{
                
                res.send(data)
            })
    })
    
}) 

app.get('/help/*',(req,res)=>{
    res.render('err404',{
        title:'Help article not found',
        nameF:'Preet'
    })
})

app.get('*',(req,res)=>{
    res.render('err404',{
        title:'Page not found',
        nameF:'Preet'
    })
})

app.listen(port,()=>{
    console.log('Server is running at port:'+port);
})