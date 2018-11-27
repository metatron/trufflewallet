const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const Web3 = require('web3');
//const appClass = require('./connection/app.js');
const bodyParser = require('body-parser');
const appClass = require('./connect/app');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.get('/accounts', (req, res) => {
  appClass.accounts((res2) => {
    res.json(res2);
  });
});

app.get('/login', (req, res) => {
  appClass.login(req.query.p, (answer) => {
    res.json(answer);
  })
});

app.get('/sendValue', (req, res) => {
  appClass.sendValue(req.query.f, req.query.p, req.query.t, req.query.a, (res2) => {
    res.json(res2);
  })
});



//サーバ起動
app.listen(port, () => {

  if (Web3.givenProvider) {
	  console.log("=======Log1");
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    appClass.web3 = new Web3(Web3.givenProvider);
  } else {
	  console.log("=======Log2");
    console.warn("No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
	// web3 1.0.0 does not support HttpProvider (https://ethereum.stackexchange.com/questions/39890/which-version-of-web3-js-should-i-use)
    appClass.web3 = new Web3(new Web3.providers.HttpProvider("http://172.22.0.2:8545"));
//    appClass.web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/hr1s0JoyZSF1c0aA2FoT"));
    appClass.setWeb3(appClass.web3);

//    appClass.web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8545"));
//    appClass.web3 = new Web3(new Web3.providers.WebsocketProvider("wss://ropsten.infura.io/hr1s0JoyZSF1c0aA2FoT")); //doesnt work
   }
  console.log("Express Listening at http://localhost:" + port);

});
