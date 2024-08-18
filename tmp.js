const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: "pk-hycWLSzNvwvuLRPwBFQYSrjsWniIAnBAunugaMVveHyoPlVa",
    baseURL: "https://api.pawan.krd/v1/",  // Certifique-se de que esta URL esteja correta
});

async function getChatCompletion() {
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: 'Say this is a test' }],
            model: 'gpt-3.5-turbo',
        });

        console.log(chatCompletion.choices[0].message.content);
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

getChatCompletion();
