const { launchBrowser } = require('./bm');
const createMySQLConnection = require('./database');



const chatWithChatGPT = async (message) => {
const connection = await createMySQLConnection();
  const from = message.from;

  (async (from) => {
    try {
      // Create the connection
      
      const u_id = from;
      const query ="SELECT chat_link FROM users WHERE u_id ='"+message.from+"'" ;
  
      // Wrap the query in a promise to handle it asynchronously
      link = await new Promise((resolve, reject) => {
        connection.query(query,  (err, results) => {
          if (err) {
            reject(new Error('Error executing the query: ' + err.message));
          } else if (results.length > 0) {
            resolve(results[0].chat_link);
          } else {
            resolve('https://chatgpt.com/');
          }
        });
      });
      // Close the connection when done
      //connection.end();
  
    } catch (error) {
      console.error('Error:', error);
    }
  })();
  

  let browser;
  try {
    // Get the browser instance
    browser = await launchBrowser();
    const page = await browser.newPage();

    // Navigate to the ChatGPT page
    await page.goto(link);

    // Wait for the page to load and show the chat input
    await page.waitForSelector('textarea', { timeout: 1000000 }); // Adjust timeout as needed

    // Type a message into the chat input
    await page.type('textarea',message.notifyName + ':'+ message.body, { delay: 100 });

    //await page.type('textarea',message.body, { delay: 10 });

    // Press Enter to send the message
    await page.keyboard.press('Enter');
    await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for 5 seconds

    // Wait for the response
    await page.waitForSelector('.icon-md-heavy', { timeout: 600000 }); // Adjust timeout as needed

    // Get the response text
    let response ;
    response = null;
    response= await page.evaluate(() => {
      const elements = document.querySelectorAll('.markdown');
const lastElement = elements[elements.length - 1];

      return lastElement ? lastElement.innerText : 'Response not found';
    });
    const url = page.url();

    console.log(url,from);
    const query = "INSERT INTO users ( chat_link, u_id) VALUES ('"+url+"','"+message.from+"')";
    connection.query(query,  (err, results) => {
      if (err) {
        return console.error('error inserting data: ' + err.stack);
      }
      console.log('Data inserted with ID: ' + results.insertId);
    });
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow error for handling by caller
  }
};

module.exports = chatWithChatGPT;
