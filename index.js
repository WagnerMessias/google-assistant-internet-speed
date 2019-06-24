const express = require('express');
const bodyParser = require('body-parser');
const {dialogflow,
       Suggestions} = require('actions-on-google');

const speedTest = require('speedtest-net');

const test = speedTest({maxTime: 5000});
const app = dialogflow();
const expressApp = express().use(bodyParser.json());

app.intent('welcome', conv => {

  conv.ask(`Bem-vindo, esse é um teste de canvas`);

  if(conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')){
    conv.ask(new Suggestions(['Download', 'Upload','Ping']));
  } 
});

// app.intent('welcome', conv => {

//     conv.ask(`Bem-vindo, posso te ajudar com informações sobre sua conexão com a internet. 
//               Você deseja as informações básicas ou completa?`);

//     if(conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')){
//       conv.ask(new Suggestions(['Download', 'Upload','Ping']));
//     } 
// });

// app.intent('internet-connection-info', (conv, {typeInfo}) => {

//   return  getInformations().then((data) => {

//     if(typeInfo.length == 1 && typeInfo[0] != 'basic'){
//       conv.ask(`especifico `);
  
//     }else{ 
//       conv.ask(`Os resultados dos testes de velocidade foram Download ${data.speeds.download} Mbps, Upload ${data.speeds.upload} Mbps com Ping de ${data.server.ping}`);
//     }

//   },(erro) => {

//   });

// });

//  function  getInformations(){
//     return new Promise(function(resolve, reject) {
//       test.on('data', data => {
//         resolve(data);
//       });
//     });
//   }

expressApp.post('/fulfillment', app);

expressApp.get('/', function (req, res) {

    res.send('Internet Speed Guru!');
});

let porta = process.env.PORT || 8080;
expressApp.listen(porta);

