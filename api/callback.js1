// pages/api/callback.js
export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).send('success');
    } else if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const params = new URLSearchParams(body);
            const providedSign = params.get('sign');
            const apiKey = 'cHr7GUxa3E'; // 替换为你的实际 API 密钥
            params.delete('sign');  // 去除签名参数
            
            // 对参数进行升序排序
            const sortedParams = new URLSearchParams([...params.entries()].sort());

            // 生成键值对字符串
            const str = [...sortedParams.entries()].map(([key, value]) => `${key}=${value}`).join('') + apiKey;

            // 生成 MD5 哈希值并转为小写
            const calculatedSign = crypto.createHash('md5').update(str).digest('hex').toLowerCase();

            // 比较计算的签名和提供的签名
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
