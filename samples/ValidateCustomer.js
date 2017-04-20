var BaseSample = require('./BaseSample');
var ValidateCustomer = function(paymentCode, customerId){
    //inherit
    BaseSample.call(this);
    this.paymentCode = paymentCode;
    this.customerId = customerId;
}

ValidateCustomer.prototype.run = function(){

    //set up options
    var options = {
        paymentCode: this.paymentCode,
        customerId: this.customerId
    };
    this.billpayment.validate_customer(options, function(err, res){
        if(err) {
            //error executing request
            console.log("Error calling get billers "+JSON.stringify(err));
            return;
        }
        else{
            //check if it was successful
            var statusCode = res.statusCode;

            if(statusCode === 200) {//request was successful

                var body = JSON.parse(res.body);

                var customersArray = body.Customers;
                
                var customer = customersArray[0];
                
                var fullName = customer.fullName;

                console.log("fullname: "+fullName);
                
            }
            else{//it was not successful for a reason
                console.log("FAILED: "+statusCode);
            }
        }
    });
}

module.exports = ValidateCustomer;