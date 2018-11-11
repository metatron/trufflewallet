const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const Web3 = require('web3');
//const truffle_connect = require('./connection/app.js');
const bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());



// GET http://localhost:3000/api/v1/
app.get('/api/v1/',function(req,res){
    res.json({
        message:"Hello,world"
    });
});

//サーバ起動
app.listen(port, () => {

  if (typeof web3 !== 'undefined') {
	  console.log("=======Log1");
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    web3 = new Web3(web3.givenProvider);
  } else {
	  console.log("=======Log2");	  
    console.warn("No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
	// web3 1.0.0 does not support HttpProvider (https://ethereum.stackexchange.com/questions/39890/which-version-of-web3-js-should-i-use)
    web3 = new Web3(new Web3.providers.HttpProvider("http://172.22.0.2:8545"));
//    truffle_connect.web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/hr1s0JoyZSF1c0aA2FoT"));
    
//    truffle_connect.web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:8545"));
//    truffle_connect.web3 = new Web3(new Web3.providers.WebsocketProvider("wss://ropsten.infura.io/hr1s0JoyZSF1c0aA2FoT")); //doesnt work
   }
  console.log("Express Listening at http://localhost:" + port);

});
