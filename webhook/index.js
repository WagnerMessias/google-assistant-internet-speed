const express = require('express');
const bodyParser = require('body-parser');
const {dialogflow} = require('actions-on-google');
const speedTest = require('speedtest-net');

const test = speedTest({maxTime: 5000});
const app = dialogflow();
const expressApp = express().use(bodyParser.json());

app.intent('welcome', conv => {
conv.ask(`Vamos testar a velocidade da internet?`)
});

expressApp.post('/fulfillment', app);

expressApp.get('/', function (req, res) {
  test.on('data', data => {
    console.log(data);
  });
    res.send('Internet Speed Guru!');
});

let porta = process.env.PORT || 8080;
expressApp.listen(porta);

