var Interswitch = require('interswitch');
var Constants = require('./Constants.js');
var BillPayment = function(clientId, clientSecret, env){
    if(!env) env = "SANDBOX";
    this.interswitch = new Interswitch(clientId, clientSecret, env);
}

BillPayment.prototype.get_billers = function(callback){
    this.interswitch.send({
        url:Constants.GET_BILLERS_URL, 
        method:Constants.GET
    }, 
    function(err, response, body){
        if(err) {
            callback(err);
        }
        else {
            callback(null, response);
        }
    });
};

BillPayment.prototype.get_categorys = function(callback){
    this.interswitch.send({
        url:Constants.GET_CATEGORYS_URL, 
        method:Constants.GET
    }, 
    function(err, response, body){
        if(err) {
            callback(err);
        }
        else {
            callback(null, response);
        }
    });
};
BillPayment.prototype.get_billers_in_category = function(options, callback){
    if(!options) {
        options = {};
    }
    
    if(!options.categoryId){
        var err = Error("No categoryId set in options object");
        callback(err);
        return;
    }

    var id = options.categoryId;
    var prefixurl = Constants.GET_CATEGORY_BILLERS_PREFIX;
    var suffixurl = Constants.GET_CATEGORY_BILLERS_SUFFIX;

    this.interswitch.send({
        url:prefixurl+id+suffixurl, 
        method:Constants.GET
    }, 
    function(err, response, body){
        if(err) {
            callback(err);
        }
        else {
            callback(null, response);
        }
    });

};
BillPayment.prototype.get_payment_items = function(options, callback){
    if(!options) {
        options = {};
    }
    if(!options.billerId){
        var err = new Error("No billerId set");
        callback(err);
        return;
    }
    
    var id = options.billerId;
    var prefixurl = Constants.GET_CATEGORY_BILLERS_PAYMENTITEMS_PREFIX;
    var suffixurl = Constants.GET_CATEGORY_BILLERS_PAYMENTITEMS_SUFFIX;

    this.interswitch.send({
        url:prefixurl+id+suffixurl, 
        method:Constants.GET
    }, 
    function(err, response, body){
        if(err) {
            callback(err);
        }
        else {
            callback(null, response);
        }
    });
};
BillPayment.prototype.validate_customer = function(options, callback){
    if(!options) options={};
    var err;
    if(!options.paymentCode) {
        err = new Error("Payment Code is not specified");
        callback(err);
        return;
    }
    if(!options.customerId){
        err = new Error("customerId is not specified");
        callback(err);
        return;
    }

    var customer = {};
    customer.paymentCode = options.paymentCode;
    customer.customerId = options.customerId;

    var custArray = [];
    custArray = custArray.concat(customer);

    var req = {};
    req.customers = custArray;

    console.log(JSON.stringify(req)+" ");

    //make the actual call here
    this.interswitch.send({
        url:Constants.CUSTOMER_VALIDATION_RESOURCE_URL, 
        method:Constants.POST,
        requestData: req
    }, 
    function(err, response, body){
        if(err) {
            callback(err);
        }
        else {
            callback(null, response);
        }
    });
};
module.exports = BillPayment;