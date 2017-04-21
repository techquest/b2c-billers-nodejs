var Constants = {
    GET: "GET",
    POST: "POST",
    GET_BILLERS_URL: "api/v2/quickteller/billers",
    GET_CATEGORYS_URL: "api/v2/quickteller/categorys",
    GET_CATEGORY_BILLERS_PREFIX: "api/v2/quickteller/categorys/",
    GET_CATEGORY_BILLERS_SUFFIX: "/billers",
    GET_CATEGORY_BILLERS_PAYMENTITEMS_PREFIX: "api/v2/quickteller/billers/",
    GET_CATEGORY_BILLERS_PAYMENTITEMS_SUFFIX: "/paymentitems",
    CUSTOMER_VALIDATION_RESOURCE_URL: "api/v2/quickteller/customers/validations",
    PAYMENT_INQUIRY_RESOURCE_URL: "api/v2/quickteller/sendAdviceRequest",
    TRANSACTION_INQUIRY_RESOURCE_URL: "api/v2/quickteller/transactions/inquirys"
};

module.exports = Constants;