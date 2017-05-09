
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

    this.clientId = env.sandbox.clientId; // for sandbox env.sandbox.clientId;
    this.clientSecret = env.sandbox.clientSecret;// for sandbox env.sandbox.clientSecret;
    this.env = env.sandbox.environment; // for sandbox env.sandbox.environment;

    this.billpayment = new BillPayment(this.clientId, this.clientSecret, this.env);
}

module.exports = BaseSample;