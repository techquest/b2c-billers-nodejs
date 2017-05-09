/**
 * A Biller can have several paymentitems.
 * The demo code below assumes you don't know the billerId; so
 * 1. Get all billers
 * 2. Select the first one and then get its paymentitmes
 */

var BaseSample = require('./BaseSample');
var GetPaymentItems = function(){
    //inherit
    BaseSample.call(this);
}


GetPaymentItems.prototype.run = function(){

    this.billpayment.get_billers(function(err, res){
        if(err) {
            //error executing request
            console.log("Error calling get billers "+JSON.stringify(err));
            return;
        }
        else{
            //check if it was successful
            var statusCode = res.statusCode;

            if(statusCode === 200) {//request was successful

                //var billerArray = JSON.parse(res.body).billers;
                var body = JSON.parse(res.body);

                var firstBiller = body.billers[2];

                
                var billerId = firstBiller.billerid;
                
                //we have the billerId
                var options = {
                    billerId: billerId
                };
                
                this.billpayment.get_payment_items(options, function(err, res){
                    if(err) {
                        //error executing request
                        console.log(""+err);
                        return;
                    }
                    else{
                        //check if it was successful
                        var statusCode = res.statusCode;

                        if(statusCode === 200) {//request was successful
                            
                            var body = JSON.parse(res.body);

                            var paymentItemsArray =body.paymentitems;
                    
                            var first = paymentItemsArray[0];
                    
                            var  id = first.paymentitemid;
                    
                            var name = first.paymentitemname;
                    
                            var amount = first.amount;
                            
                            console.log("payment item id: "+id);
                            console.log("payment item name: "+name);
                            console.log("payment item amount: "+amount);
                        }
                        else{//it was not successful for a reason
                            console.log("FAILED: "+statusCode);
                        }
                    }
                });
                            
            }//end of get categorys billers
            else{//it was not successful for a reason
                console.log("FAILED: ");
            }
        }
    }.bind(this));

///////////////////////////////////////////////////////////////
    
}

module.exports = GetPaymentItems;