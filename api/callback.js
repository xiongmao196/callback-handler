// api/callback.js

export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).send('success');
    } else if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            console.log(body);
            // 解析并验证签名
            const params = new URLSearchParams(body);
            const providedSign = params.get('sign');
            const apiKey = 'cHr7GUxa3E'; // 替换为你的 API 密钥
            params.delete('sign');
            params.sort();
            const str = Array.from(params.entries()).map(([key, value]) => `${key}=${value}`).join('') + apiKey;
            const calculatedSign = require('crypto').createHash('md5').update(str).digest('hex').toLowerCase();
            
            if (providedSign === calculatedSign) {
                res.status(200).send('success');
            } else {
                res.status(400).send('error');
            }
        });
    } else {
        res.status(405).send('Method Not Allowed');
    }
}
