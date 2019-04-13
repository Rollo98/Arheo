const app = require('./app');
// Start the server
const port = process.env.PORT || 5000;
const server = require('http').createServer(app);

server.listen(port);
console.log(`Server listening at ${port}`);
