'use strict';

// Import the appropriate service and chosen wrappers
const {dialogflow} = require('actions-on-google');
const functions = require('firebase-functions');

// Create an app instance
const app = dialogflow({debug: true});


exports.yourAction = functions.https.onRequest(app);


//handlers for fallback events
app.fallback((conv) => {
    conv.ask(`I couldn't understand. Can you say that again?`);
});

//handlers for error events
app.catch((conv, error) => {
    console.error(error);
    conv.ask('I encountered a glitch. Can you say that again?');
});




//Handlers for intents

app.intent('Default Welcome Intent', (conv) => {

  conv.ask('Seja bem-vindo, informe seu pedido');

});


app.intent('pedido-pizza', async (conv, {sabor, tamanho, bebida, bebida_qtd}) => {

  let numeroPedido =  await realizarPedido(sabor, tamanho, bebida, bebida_qtd)

  conv.close(`Pedido realizado!, o número é  ${numeroPedido}?`);
  
});


class Helper {
  constructor(conv) {
    this.conv = conv;
  }

  func1() {
    this.conv.ask(`What's up?`);
  }
}

app.middleware((conv) => {
  conv.helper = new Helper(conv);
});

app.intent('Default Welcome Intent', (conv) => {
  conv.helper.func1();
});


const {dialogflow,
       SimpleResponse} = require('actions-on-google');
 //...

conv.ask('Seja bem-vindo, informe seu pedido');

conv.ask(new SimpleResponse({
  speech: `Howdy, this is GeekNum. I can tell you fun facts about almost any number, my favorite 
            is 42. What number do you have in mind?`,
  text: 'Howdy! I can tell you fun facts about almost any number. What do you have in mind?',
}));

const ssml = '<speak>' +
    'Here are <say-as interpret-as="characters">SSML</say-as> samples. ' +
    'I can pause <break time="3" />. ' +
    'I can play a sound <audio src="https://www.example.com/MY_WAVE_FILE.wav">your wave file</audio>. ' +
    'I can speak in cardinals. Your position is <say-as interpret-as="cardinal">10</say-as> in line. ' +
    '</speak>';
conv.ask(ssml);
//...

const {dialogflow,
       BasicCard,
       Button,
       Image} = require('actions-on-google');
//...
conv.ask(new BasicCard({
  text: `This is a basic card.  Text in a basic card can include "quotes" and
  most other unicode characters including emoji 📱.  Basic cards also support
  some markdown formatting like *emphasis* or _italics_, **strong** or
  __bold__, and ***bold itallic*** or ___strong emphasis___ as well as other
  things like line  \nbreaks`, // Note the two spaces before '\n' required for
                               // a line break to be rendered in the card.
  subtitle: 'This is a subtitle',
  title: 'Title: this is a title',
  buttons: new Button({
    title: 'This is a button',
    url: 'https://assistant.google.com/',
  }),
  image: new Image({
    url: 'https://example.com/image.png',
    alt: 'Image alternate text',
  }),
  display: 'CROPPED',

}));
//....

const {dialogflow,
  Suggestions,
  LinkOutSuggestion} = require('actions-on-google');
//...
conv.ask(new Suggestions('Suggestion Chips'));
conv.ask(new Suggestions(['suggestion 1', 'suggestion 2']));
conv.ask(new LinkOutSuggestion({
  name: 'Suggestion Link',
  url: 'https://assistant.google.com/',
}));
//...

const {dialogflow,
      Table} = require('actions-on-google');
//...
conv.ask('This is a simple table example.')
conv.ask(new Table({
  dividers: true,
  columns: ['header 1', 'header 2', 'header 3'],
  rows: [
    ['row 1 item 1', 'row 1 item 2', 'row 1 item 3'],
    ['row 2 item 1', 'row 2 item 2', 'row 2 item 3'],
  ],
}))
//...
    
