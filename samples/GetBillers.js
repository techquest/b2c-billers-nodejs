var BaseSample = require('./BaseSample');
var GetBillers = function(){
    //inherit
    BaseSample.call(this);
}

GetBillers.prototype.run = function(){

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

                var billerArray = JSON.parse(res.body).billers;
                var firstBiller = billerArray[0];

                var billerId = firstBiller.billerid;
                var billername = firstBiller.billername;
                console.log(billerId+" "+billername);
            }
            else{//it was not successful for a reason
                console.log("FAILED: "+statusCode);
            }
        }
    });
}

module.exports = GetBillers;