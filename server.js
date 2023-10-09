const express = require("express");
const https = require("https");
require('dotenv').config();
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended:true}))


app.get("/", function(req, res){
	
	res.sendFile(__dirname+"/index.html");

});

app.post("/", function(req, res){
	const query = req.body.cityName;
	const apiKey = process.env.apiKey
	const unit = "metric"
	const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid="+apiKey+"&units="+unit+" "
	https.get(url, function(response){
		console.log(response.statusCode);

		response.on("data", function(data){
			const weatherdata = JSON.parse(data)
			
			const temp = weatherdata.main.temp;

			const desc = weatherdata.weather[0].description;
			const icon = weatherdata.weather[0].icon;
			const iconUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png"

			res.write("<h1>The temperature in "+query+" is "+ temp+" degree</h1>");
			res.write("<h2>The weather is "+desc+"</h2>");
			res.write("<img src="+iconUrl+"></img>")

			res.send()
		})
	})
});

app.listen("3000", function(){
	console.log("Port is listening at http://localhost:3000");
});



