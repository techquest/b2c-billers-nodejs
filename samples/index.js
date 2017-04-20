/**
 * Space to test all the samples
 */

var GetBillers = require('./GetBillers');
var GetCategory = require('./GetCategory');
var GetBillersInCategory = require('./GetBillersInCategory');
var GetPaymentItems = require('./GetPaymentItems');
var ValidateCustomer = require('./ValidateCustomer');
var MakePayment = require('./MakePayment');
//uncomment for GetBillers
// var biller = new GetBillers();
// biller.run();


//uncomment for GetCategory
// var biller = new GetCategory();
// biller.run();

//uncomment for GetBillersInCategory
// var biller = new GetBillersInCategory();
// biller.run();

//uncomment for GetPaymentItems
// var biller = new GetPaymentItems();
// biller.run();


//uncomment for validate customer call
//var paymentCode = "40201";//glo recharge test
//sample customerId for the above paymentCode
//var customerId = "07030241757";
//var biller = new ValidateCustomer(paymentCode, customerId);
//biller.run();


//uncomment for make payment call
var paymentCode = "40201";//glo recharge test
//sample customerId for the above paymentCode
var customerId = "07030241757";
var amount = 500;
var biller = new MakePayment(amount, customerId, paymentCode);
biller.run();
