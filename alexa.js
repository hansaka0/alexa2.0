const { MessageMedia, Buttons, List } = require('whatsapp-web.js');
const fs = require('fs');
const path = require('path');





// varsss
const owner = '94740970377@c.us';
//
module.exports = (alexa) => {
    alexa.on('message', async(message) => {
        let msender = await new Promise((resolve) => {
            if(message.author == null){
                resolve(message.from);
            } else{
                resolve(message.author);
            };
        })
//console.log(message) ;
        console.log(`Message received:${message._data.notifyName}, ${message.body}, ${msender}`);

        switch (message.body.toLowerCase()) {
            
            case 'ping':
                message.reply('pong');
                break;
            case 'hi':
                message.reply('Hello! How can I assist you today?');
                break;
            case 'info':
                message.reply('This is an automated response system. How can I help you?');
                break;

                case 'fk':
                    message.reply('tk');
                    break;

                    case 'status':
                        
                        if(message.from == `${owner}` ) {
                           // Set the WhatsApp status
                const newStatus = 'Hello, I am using WhatsApp Web.js!';
                try {
                    await alexa.setStatus(newStatus);
                    message.reply('Status updated successfully!');
                } catch (error) {
                    console.error('Error updating status:', error);
                    message.reply('Failed to update status.');
                } 
                        }
                        
                        break;
                
                      

            default:
                const { default: got } = await import('got');
                //const sender = message._data.id.remote;
                //if (message.author)
                    
                let { body } = await got(`http://api.brainshop.ai/get?bid=182972&key=Guw7Q0WDp4mdqgQb&uid=[${msender}]&msg=[${message.body}]`);
                let value = JSON.parse(body).cnt;
                console.log(value);
                message.reply(value);
                break;

        }
        
    });
};