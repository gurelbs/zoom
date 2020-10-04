const { static } = require('express');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server)
const {v4: uuidv4} = require('uuid');

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req,res) => {
    res.redirect(`/${uuidv4()}`)
})

app.get('/:room', (req, res) => {
    res.render('room',{ roomId: req.params.room });
})

io.on('connection', socket => {
    socket.on('join-room', () => {
        console.log("joined room");
    })
})







const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server Started on http://localhost:${PORT}`));