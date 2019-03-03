const app = require('./app');
const socket = require('socket.io');
// Start the server
const port = process.env.PORT || 5000;
const server = require('http').createServer(app);
let io = socket(server);

var socketUsers = require('socket.io.users');
socketUsers.Session(app);

io.origins('**:**')

io.on('connection', (socket) => {
    socket.on('refresh', (data) => {
        socket.broadcast.emit(data, "")
    })
});

server.listen(port);
console.log(`Server listening at ${port}`);
