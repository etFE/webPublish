const express = require('express');
const connectHistoryApiFallback = require('connect-history-api-fallback');
const server = express()

// server.use(express.static('public'));

server.use('/', connectHistoryApiFallback());
server.use('/', express.static('webRoot'));

server.listen(9000, () => {
    console.log("%s listening at %s", server.name, 9000);
});