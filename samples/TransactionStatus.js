var BaseSample = require('./BaseSample');
var TransactionStatus = function(){
    //inherit
    BaseSample.call(this);
}

var paymentCode = "90101"; //paymentCode for test="40201", paymentCode for sandbox=90101
//sample customerId for the above paymentCode
var customerId = "07030241757";
var amount = 500;
/**
 * The referencePrefix is a unique 4-sequence code for each Biller
 * You can get your own when you are set up as a merchant on our platform
 * It is not mandatory to have one
 * We strongly advice you get one because it will reduce the chances of reference collisions.
 * 
 * In the example below, we will be using "test" as out referencePrefix
 */
var referencePrefix = "1456"; //prefix for test environment, use test

var requestRef = parseInt(100000000*Math.random()); //unique request reference

requestRef = referencePrefix + requestRef;


/**
 * 
 * 1. Make a payment
 * 2. Use the requestRef from the first call to Query for the TransactionStatus
 * 
 */

TransactionStatus.prototype.run = function(){

    var options = {
        paymentCode: paymentCode,
        customerId: customerId,
        amount: amount,
        requestRef: requestRef
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

            
            option = {};
            options.requestReference = requestRef;
            this.billpayment.get_transaction_status(options, function(err, res){
                if(err) {
                    //error executing request
                    console.log(err);
                    return;
                }
                else{
                    //check if it was successful
                    var statusCode = res.statusCode;
                    
                    var body = JSON.parse(res.body);

                    
                    if(body.errors) {

                        //there are errors
                        console.log(JSON.stringify(res.body));
                    }
                    else{

                        //there are no errors
                        if(statusCode === 200) {

                            var transactionReference = body.transactionRef;
                            console.log(transactionReference);
                        }else{
                            //error in response
                        }
                    }
                    
                }
            });
                
                
            
           
        }
    }.bind(this));// end of make payment call

}

module.exports = TransactionStatus;