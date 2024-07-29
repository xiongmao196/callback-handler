const { createServer } = require('http');
const querystring = require('querystring');

const server = createServer((req, res) => {
    if (req.method === 'GET') {
        // 处理GET请求
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('success');
    } else if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            // 解析表单数据
            const parsedBody = querystring.parse(body);
            console.log('Received POST data:', parsedBody);

            // 确保处理返回小写的 'success'
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('success');
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
