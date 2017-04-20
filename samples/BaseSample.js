
/**
 * Base Sample that all sample classes implement from
 * All samples have a run method to showcase how the implementation should be done
 */

//environment file
var env = require('./env.js');
var BillPayment = require('../src/billpayment.js');
var BaseSample = function(){
    
    /**
     * Set the clientid and clientsecret
     * 
     * env.uat.clientId  , env.uat.clientSecret : For Test
     * env.sandbox.clientId, env.sandbox.clientSecret : For Sandbox
     */

    this.clientId = env.uat.clientId; // for sandbox env.sandbox.clientId;
    this.clientSecret = env.uat.clientSecret;// for sandbox env.sandbox.clientSecret;
    this.env = env.uat.environment; // for sandbox env.sandbox.environment;

    console.log("at BaseSample "+this.clientId);
    this.billpayment = new BillPayment(this.clientId, this.clientSecret, this.env);
}

module.exports = BaseSample;