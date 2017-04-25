/**
 * Space to test all the samples
 */

var GetBillers = require('./GetBillers');
var GetCategory = require('./GetCategory');
var GetBillersInCategory = require('./GetBillersInCategory');
var GetPaymentItems = require('./GetPaymentItems');
var ValidateCustomer = require('./ValidateCustomer');
var MakePayment = require('./MakePayment');
 var TransactionStatus = require('./TransactionStatus');
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
//var paymentCode = "40201";//glo recharge test
//sample customerId for the above paymentCode
//var customerId = "07030241757";
//var amount = 500;
/**
 * The referencePrefix is a unique 4-sequence code for each Biller
 * You can get your own when you are set up as a merchant on our platform
 * It is not mandatory to have one
 * We strongly advice you get one because it will reduce the chances of reference collisions.
 * 
 * In the example below, we will be using "test" as out referencePrefix
 */
// var referencePrefix = "test"; //

// var requestRef = parseInt(100000000*Math.random()); //unique request reference

// requestRef = referencePrefix + requestRef;

// var biller = new MakePayment(amount, customerId, paymentCode, requestRef);
// biller.run();






//uncomment for transaction-status
var biller = new TransactionStatus();
biller.run();
//create options hash

