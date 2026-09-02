const express = require('express');
const redis = require('redis');

const app = express();

const client = redis.createClient({
    host: 'redis',
    port: 6379
});

client.on('error', (err) => {
    console.log('Redis Error:', err);
});

client.set('visitsCounter', 0);

app.get('/', (req, res) => {
    client.get('visitsCounter', (err, visitsCounter) => {
        if (err) {
            return res.status(500).send(err.message);
        }

        res.send('Visits Counter: ' + visitsCounter);

        client.set('visitsCounter', parseInt(visitsCounter) + 1);
    });
});

app.listen(8080, '0.0.0.0', () => {
    console.log('Server running on port 8080');
});
