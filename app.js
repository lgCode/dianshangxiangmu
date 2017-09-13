var express = require('express');
var app = express();

// console.log( app );
app.use( express.static('public') );

app.listen(7777,function(){
	console.log('7777 is run');
});

