const http = require('http');
const fs = require('fs');
const path = require('path');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

function createStaticServer(rootDir, defaultFile = 'index.html') {
  return http.createServer((req, res) => {
    let reqPath = decodeURI(req.url.split('?')[0]);
    if (reqPath === '/' || reqPath === '') {
      reqPath = '/' + defaultFile;
    }

    const filePath = path.join(rootDir, reqPath);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === 'ENOENT') {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('404 Not Found');
        } else {
          res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('500 Server Error');
        }
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });
}

// Server 1: Port 8080 -> Gull Bano Tribute Website (Root Directory)
const gullBanoServer = createStaticServer(__dirname);
gullBanoServer.listen(8080, '0.0.0.0', () => {
  console.log('🌸 Gull Bano Garden site running at http://localhost:8080/');
});

// Server 2: Port 3000 -> Streetwear Backup (if preview needed)
const streetwearDir = path.join(__dirname, 'streetwear_store_backup');
if (fs.existsSync(streetwearDir)) {
  const streetwearServer = createStaticServer(streetwearDir);
  streetwearServer.listen(3000, '0.0.0.0', () => {
    console.log('🛍️ Streetwear store backup running at http://localhost:3000/');
  });
}
