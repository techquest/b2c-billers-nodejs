var BaseSample = require('./BaseSample');
var MakeTransactionInquiry = function(options){
    //inherit
    BaseSample.call(this);
    if(!options) options = {};
    this.options = options;
    
}

MakeTransactionInquiry.prototype.run = function(){

    this.billpayment.transaction_inquiry(this.options,function(err, res){
        if(err) {
            //error executing request
            console.log(err);
            return;
        }
        else{
            //check if it was successful
            var statusCode = res.statusCode;

            if(statusCode === 200) {//request was successful

                var body = JSON.parse(res.body);

                var transactionRef = body.TransactionRef;
                console.log("TransactionRef: "+transactionRef);
                
            }
            else{//it was not successful for a reason
                console.log("FAILED: "+statusCode);
            }
        }
    });
}

module.exports = MakeTransactionInquiry;