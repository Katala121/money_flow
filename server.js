import process from 'process';
import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', async (request, response) => {
    response.send('Root route');
});

const server = app.listen(PORT, () => {
    console.log(`Server started on port ${server.address().port}`);
});