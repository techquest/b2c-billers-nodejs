var BaseSample = require('./BaseSample');
var GetBillers = require('./GetBillers');
var GetCategory = require('./GetCategory');
var GetBillersInCategory = require('./GetBillersInCategory');
var GetPaymentItems = require('./GetPaymentItems');
var ValidateCustomer = require('./ValidateCustomer');
var MakePayment = require('./MakePayment');
var TransactionStatus = require('./TransactionStatus');
/**
 * 
 * @author 
 * An all in one sample is meant to show all the requests used at once.
 * The flow is 
 * 
 * 1. Get All Categorys.
 * 2. Select a biller from any category.
 * 3. Get all payment item codes for that biller selected from Number 2 Step.
 * 4. Validate Customer.
 * 5. Make Payment
 * 6. Query the status of a transaction
 *
 */

var Main = function(){

    BaseSample.call(this);
};

var currentObj = new Main();

console.log("STEP 1: GET ALL CATEGORIES");
//1 Get All Categories
currentObj.billpayment.get_categorys(function(err, res){
    if(err) throw err;

    var categoryResponse = JSON.parse(res.body);
    if(categoryResponse.errors) throw new Error(categoryResponse.errors);
    var firstCategory = categoryResponse.categorys[0];
    var categoryId = firstCategory.categoryid;
    var categoryname = firstCategory.categoryname;
    var categorydesc = firstCategory.categorydescription;
    console.log(firstCategory);

    console.log("STEP 2: GET ALL BILLERS IN SELECTED CATEGORIES");
    //2 Select a biller given a categoryId
    var options = {};
    options.categoryId = categoryId;

    currentObj.billpayment.get_billers_in_category(options, function(err, res){
        if(err) throw err;

        var billerResponse = JSON.parse(res.body);
        if(billerResponse.errors) throw new Error(billerResponse.errors);
        var billerArray = billerResponse.billers;
        var firstBiller = billerArray[0];
        var billerId = firstBiller.billerid;
        var billername = firstBiller.billername;
        console.log(billername);

        console.log("STEP 3: GET ALL PAYMENT CODE ITEMS IN SELECTED BILLER");
        // 3. Get Payment Items Codes for the Biller in Step 2 Above
        options = {};
        options.billerId = billerId;
        currentObj.billpayment.get_payment_items(options, function(err, res){
            if(err) throw err;

            var paymentCodeResponse = JSON.parse(res.body);
            if(paymentCodeResponse.errors) throw new Error(paymentCodeResponse.errors);
            var paymentItemsArray =paymentCodeResponse.paymentitems;
            var first = paymentItemsArray[0];
            var  id = first.paymentitemid;
            var name = first.paymentitemname;
            var amount = first.amount;
            console.log("payment item id: "+id);
            console.log("payment item name: "+name);
            console.log("payment item amount: "+amount);

            console.log("STEP 4: VALIDATE CUSTOMER");
            //4. Make a call to validate a customer exists, You can skip this
            // and continue with the request as we will verify if the customer exists
            // or not.
            var paymentCode = "40201";//glo recharge test
        
            //sample customerId for the above paymentCode
            var customerId = "07030241757";

            var amount = 500;

            options = {};
            options.paymentCode = paymentCode;
            options.customerId = customerId;

            currentObj.billpayment.validate_customer(options, function(err, res){
                if(err) throw err;
                var validateCustomerResponse = JSON.parse(res.body);

                if(validateCustomerResponse.errors) throw new Error(validateCustomerResponse.errors);


                var customersArray = validateCustomerResponse.Customers;
                
                var customer = customersArray[0];
                
                var fullName = customer.fullName;

                console.log("fullname: "+fullName);

                console.log("STEP 5: MAKE PAYMENT");

                //5. Make payment to this customer

                /**
                 * The referencePrefix is a unique 4-sequence code for each Biller
                 * You can get your own when you are set up as a merchant on our platform
                 * It is not mandatory to have one
                 * We strongly advice you get one because it will reduce the chances of reference collisions.
                 * 
                 * In the example below, we will be using "test" as out referencePrefix
                 */
                var referencePrefix = "test"; //

                var requestRef = parseInt(100000000*Math.random()); //unique request reference

                requestRef = referencePrefix + requestRef;
                var options = {
                    paymentCode: paymentCode,
                    customerId: customerId,
                    amount: amount,
                    requestRef: requestRef
                };

                currentObj.billpayment.make_payment(options, function(err, res){

                    if(err) throw err;
                    console.log(res.body+" "+err);
                    // var paymentResponse = JSON.parse(res.body);
                    
                    // var transactionRef = paymentResponse.transactionRef; //unique transactionRef for this request
                    // console.log("Transaction ref is: "+transactionRef);


                    console.log("STEP 6: TRANSACTION STATUS");
                    options = {};
                    options.requestReference = requestRef;
                    console.log(requestRef);
                    currentObj.billpayment.get_transaction_status(options, function(err, res){
                        if(err) throw err;
                        var transactionStatus = JSON.parse(res.body);
                        if(transactionStatus.errors) throw new Error(transactionStatus.errors);
                        
                    });

                });
            });
        
        });
    });
});
