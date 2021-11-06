const express = require('express');
const bodyParser = require('body-parser');

const mqtt = require('mqtt');
const mqttClient = mqtt.connect('mqtt://127.0.0.1:1883');

const app = express();
const path = require('path');


Server = app.listen(3000);
const socket = require('socket.io');
const io = socket(Server);

// Creat IO Connection
io.on('connection', (socket) => {
    console.log('Socket Connected');
});

// MQTT SERVER //
mqttClient.on('connect', () => {
    console.log('Mqtt connected');
    mqttClient.subscribe(Topic);

});
mqttClient.on('offline', () => {
    console.log('MQTT offline');
    mqttClient.unsubscribe('/deviceInfo');
});

mqttClient.on('message', (topic, message) => {
    message = message.toString();
    io.emit('data', message);
    console.log("Pesan : ", message);

});

io.on('connection', (socket) => {
    socket.on('message', (data) => {
        console.log('pesan dari client:', data);
        mqttClient.publish("data", data);
    });
});



const router = require('./routers/routes');


const Topic = '#';


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use(router);

// app.listen(3000, () => {
//     console.log(`Server started and listening at http://localhost:3000`);
// });

console.log("Startiong Program")

app.get('/', (req, res) => {
    res.send(`Hello World !`)
});