import http from 'http'

//create a server object:
http.createServer(function (req, res) {
  if (req.method == 'POST') {
      var body = ''
      req.on('data', function (data) {
          body += data
          // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
          if (body.length > 1e6) { 
              // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
              req.connection.destroy()
          }
      })
      req.on('end', function () {

          var POST = JSON.parse(body)
          // use POST
          console.log(POST)
          res.write(JSON.stringify(POST)) //write a response to the client
          res.end() //end the response
      })
  }
}).listen(8080) //the server object listens on port 8080
