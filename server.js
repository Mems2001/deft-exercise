const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const routes = require('./app/router/index')

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  // console.log(parsedUrl)

  // API routing
  if (parsedUrl.pathname.startsWith('/api/')) {
    const route = routes[parsedUrl.pathname];
    if (route && route[req.method]) {
      route[req.method](req, res, parsedUrl.query);
      return;
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Route not found' }));
      return;
    }
  }

  // Serve static files
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  // console.log(filePath)
  const ext = path.extname(filePath);

  let contentType = 'text/html';
  if (ext === '.js') contentType = 'text/javascript';
  if (ext === '.css') contentType = 'text/css';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Instead of throwing, fallback to index.html for SPA routing
        fs.readFile(path.join(__dirname, 'index.html'), (err2, html) => {
          if (err2) {
            res.writeHead(500);
            res.end('Server Error');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
          }
        });
      } else {
        // Log but don't kill the server
        console.warn('Request failed:', filePath, err.code);
        res.writeHead(404);
        res.end('Route Not Found');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  })

});

server.listen(3000, () => {console.log('Server running at http://localhost:3000')});
