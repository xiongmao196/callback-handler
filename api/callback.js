export default function handler(req, res) {
    console.log(`Received request: ${req.method}`);
    if (req.method === 'GET') {
        res.status(200).send('success');
    } else if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            console.log(`Request body: ${body}`);
            res.status(200).send('success');
        });
    } else {
        res.status(405).send('Method Not Allowed');
    }
}
