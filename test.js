(async () => {
  const { default: got } =  require('got');
  let { body } = await got(`http://api.brainshop.ai/get?bid=182972&key=Guw7Q0WDp4mdqgQb&uid=[hansaka]&msg=[hi]`);
  let value = JSON.parse(body).cnt;
  console.log(value);
})();
