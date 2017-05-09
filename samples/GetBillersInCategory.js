var BaseSample = require('./BaseSample');
var GetBillersInCategory = function(){
    //inherit
    BaseSample.call(this);
}

/**
 * This demo makes a call to get all categorys
 * Selects the first categoryId and uses it to get all its billers.
 * ---------------------------------------------------------------
 * You can make a simpler call if you already have a categoryId
 */
GetBillersInCategory.prototype.run = function(){

    this.billpayment.get_categorys(function(err, res){
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

                var firstCategory = body.categorys[0];

                
                var categoryId = firstCategory.categoryid;
                
                //we have the categoryId. Next make call to get all its billers
                //if you already have a categoryId, you can start from here
                var options = {
                    categoryId: categoryId
                };
                
                this.billpayment.get_billers_in_category(options, function(err, res){
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

                            
                            var billerArray = body.billers;
                  
                            var firstBiller = billerArray[0];

                            var billerId = firstBiller.billerid;

                            var billername = firstBiller.billername;

                            console.log("biller id: "+billerId);
                            console.log("biller name: "+billername);
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

module.exports = GetBillersInCategory;