var BaseSample = require('./BaseSample');
var MakePayment = function(amount, customerId, paymentCode, requestRef){
    //inherit
    BaseSample.call(this);
    this.paymentCode = paymentCode;
    this.customerId = customerId;
    this.amount = amount;
    this.requestRef = requestRef;

}

MakePayment.prototype.run = function(){

    //set up options
    var options = {
        paymentCode: this.paymentCode,
        customerId: this.customerId,
        amount: this.amount,
        requestRef: this.requestRef
    };
    this.billpayment.make_payment(options, function(err, res){
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
                console.log("  \n"+res.body+" \n");
                var transactionRef = body.transactionRef; //unique transactionRef for this request
                console.log("Transaction ref is: "+transactionRef);
                
            }
            else{//it was not successful for a reason
                console.log(""+statusCode+" "+JSON.stringify(res.body));
            }
        }
    });
}

module.exports = MakePayment;