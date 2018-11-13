const Tx = require('ethereumjs-tx');

module.exports = {
    login: function(privateKey, callback) {
        var from = this.web3.eth.accounts.privateKeyToAccount(privateKey);
  	    this.account = from;
		
	    callback(this.account);
    },
}
