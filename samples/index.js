/**
 * Space to test all the samples
 */

var GetBillers = require('./GetBillers');
var GetCategory = require('./GetCategory');
var GetBillersInCategory = require('./GetBillersInCategory');
var GetPaymentItems = require('./GetPaymentItems');

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
var biller = new GetPaymentItems();
biller.run();

