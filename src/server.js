import process from 'process';
import express from 'express';
import user from './routers/UserRouter.js';

const app = express();

const PORT = process.env.PORT || 3000;

app.use('/users', user);

const server = app.listen(PORT, () => {
    console.log(`Server started on port ${server.address().port}`);
});