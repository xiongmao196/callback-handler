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
            res.status(200).send('success');
        });
    } else {
        res.status(405).send('Method Not Allowed');
    }
}
