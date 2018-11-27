const Tx = require('ethereumjs-tx');

module.exports = {
	//could not auto set the class variable.
	//creating setter for class variable.
	setWeb3: (web3) => {
		this.web3 = web3;
	},

	accounts: (callback) => {
		this.web3.eth.getAccounts().then((acts) =>{
		    callback(acts);
		});
	},

    login: (privateKey, callback) => {
        var from = this.web3.eth.accounts.privateKeyToAccount(privateKey);
  	    this.account = from;
		
	    callback(this.account);
    },

    sendValue: (fromAddress, privkey, toAddress, amount, callback) => {
    	this.web3.eth.getTransactionCount(fromAddress).then((txCount) => {
    		var rawTx = {
				nonce: this.web3.utils.toHex(txCount),
				gasPrice: this.web3.utils.toHex(21000),
				gasLimit: this.web3.utils.toHex(3000000),
				from: fromAddress,
				to: toAddress,
				value: this.web3.utils.toHex(amount),
			    chainId: 100
    		};
    		var tx = new Tx(rawTx);

			var privkeyBuf = new Buffer.from(privkey, 'hex');
    		tx.sign(privkeyBuf);

    		console.log("Validation:", tx.validate());
			
			var serializedTx = tx.serialize();
//    		console.log("TX: " +  serializedTx.toString('hex'));
//    		this.web3.eth.estimateGas({from: fromAddress, to: toAddress, amount: this.web3.utils.toWei("1", "ether")}).then(console.log);


    		this.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).
				on('transactionHash', (hash) =>{

		            console.log("localhost:8081/checkTx?t=" + hash);
				}).
				then((result) => {
					console.log(result);

					callback(result);
				}).
				catch((e) => {
					console.log("********catch error1");
			        console.log(e);

					callback(e);
				});

    	}).
    	catch((err) => {
					console.log("********catch error2");
			        console.log(err);

					callback(err);
    	});
    }
}
