const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// process.env is an object that sotres all of our environment values as key value pairs
const port = process.env.PORT || 3000;
// specify an absolute path
hbs.registerPartials(__dirname +'/views/partials');

// using app.get you can specify as many routes as you would like
var app = express();
// this here is from hbs, key is what you wanna set, value is value u wanna use, this line is a must in order to get started with hbs:
app.set('view engine', 'hbs');

// register helper takes 2 arguments: name of the helper and the function to execute with the helper
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) =>{
	return text.toUpperCase();
});






// next exists so u can tell express when middleware function is done
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
  	if(err){
  		console.log('Unable to append to server.log');
  	}
  });
  next();
});



// app.use((req,res,next) => {
// 	res.render('maintenance.hbs');
// });

// express.static takes the absolute path to what you wanna serve up 
// __dirname sets by default the directory name to the one the file is in
app.use(express.static(__dirname + '/public'));





// this lets us set up a handler for an HTTP get request
// first argument of this function is the URL, and the second is what we want returned
app.get('/', (req, res) => {
	res.render('home.hbs',{
		pageTitle: 'Home Page',
	});
});


app.get('/about', (req,res) =>{
	// res.render allows you to render any of the templates you have set up with hbs
	// in order to make your hbs page dynamic, all you have to do is pass a second input value into 
	// the res.render function
	res.render('about.hbs',{
		pageTitle: 'About Page',
	// here we create a new object and getFullYear is a function that automatically updates the year
		// year: new Date().getFullYear()
	});
});

app.get('/bad', (req,res) =>{
	res.send({
		errorMessage:'Unable to handle request'
	});
});


// app.listen binds the app to a port on our machine, use port 3000
app.listen(port, () =>{
	console.log('server is up!')
});