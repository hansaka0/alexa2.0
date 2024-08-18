const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const handleMessage = require('./alexa');
const puppeteer = require('puppeteer');


const alexa = new Client({
    authStrategy: new LocalAuth({
        clientId: "client-one" 
    }),
    puppeteer: {
        headless: true,
        devtools: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
});

alexa.on('qr', (qr) => {
    console.log('QR RECEIVED');
    qrcode.generate(qr, { small: true });
});


alexa.on('ready', async() => {
    console.log('Alexa is ready!');
    handleMessage(alexa);
});


alexa.on('authenticated', (session) => {
    console.log('Authenticated successfully');
});


alexa.on('auth_failure', msg => {
    console.error('AUTHENTICATION FAILURE', msg);
});





alexa.initialize();
