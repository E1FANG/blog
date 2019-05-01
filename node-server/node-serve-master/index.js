var http = require('http')
var fs = require('fs')
var path = require('path')
var url = require('url')
var server= http.createServer(function(request,response){
	setTimeout(function(){
		response.setHeader('Content-Type','text/html; charset=utf-8')
		response.writeHead(200, 'hha')
		var pathObj = url.parse(request.url,true)
		console.log(pathObj) 
		console.log(request.url)
		switch(pathObj.pathname){
			case '/getday':
				var ret
				if(pathObj.query.day == "sunday"){
					ret = {
						day: 'sunday',
						weather: '晴天'
					}}
				else{
					ret={
						day: pathObj.query.day,
						weather: '我也不知道是什么鬼天气'
					}
				}
				response.end(JSON.stringify(ret))
				break;
			case '/user/123':
				response.write('<!doctype html><head></head><body><h1>现在展示的是readme的内容</h1></body></html>')
				response.end( fs.readFileSync(__dirname + '/README.md') )
				break;
			default:
				response.end(fs.readFileSync(__dirname+'/sample'+'/test.html'))

	}}),2000})
console.log('open http://localhost:8080')
server.listen(8080)