require('dotenv').config();
const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(express.urlencoded({extended:true}));

app.get("/", function(req,res)
{
   res.sendFile(__dirname + "/index.html");
    
});

app.post("/",function(req,res)
{
   const city= req.body.CityName
   const api_key= process.env.API_KEY;
   const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+api_key+"";
https.get(url,function(response)
{
    console.log(response.statusCode);
    console.log(response.statusMessage);
    response.on("data", function(data)
    {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherdes = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
        console.log(temp);
        console.log(weatherdes);
        res.write("<h1>The temperature in "+city+" is " + temp + " degrees Celsuis</h1>");
        res.write("<h3>The weather is currently " + weatherdes + "</h3>");
        res.write("<img src="+imageURL+" >");
        res.send();
    })
});
})

app.listen(3000, function()
{
    console.log("Server is tuned to channel 3000");
})