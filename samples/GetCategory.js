var BaseSample = require('./BaseSample');
var GetCategory = function(){
    //inherit
    BaseSample.call(this);
}

GetCategory.prototype.run = function(){

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
                var categoryname = firstCategory.categoryname;
                var categorydesc = firstCategory.categorydescription;

                console.log(categoryId+" "+categoryname+" "+categorydesc);
                
            }
            else{//it was not successful for a reason
                console.log("FAILED: "+statusCode);
            }
        }
    });
}

module.exports = GetCategory;