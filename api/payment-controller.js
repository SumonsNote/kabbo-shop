import httpCall from "./fetch";

class SslCommerzPayment {
  constructor(store_id, store_passwd, live = false) {
    this.baseURL = `https://${live ? "securepay" : "sandbox"}.sslcommerz.com`;
    this.initURL = `${this.baseURL}/gwprocess/v4/api.php`;
    this.validationURL = `${this.baseURL}/validator/api/validationserverAPI.php?`;
    this.refundURL = `${this.baseURL}/validator/api/merchantTransIDvalidationAPI.php?`;
    this.refundQueryURL = `${this.baseURL}/validator/api/merchantTransIDvalidationAPI.php?`;
    this.transactionQueryBySessionIdURL = `${this.baseURL}/validator/api/merchantTransIDvalidationAPI.php?`;
    this.transactionQueryByTransactionIdURL = `${this.baseURL}/validator/api/merchantTransIDvalidationAPI.php?`;
    this.store_id = store_id;
    this.store_passwd = store_passwd;
  }

  async init(data, url = null, method = "POST") {
    return httpCall({
      url: url || this.initURL,
      method,
      data: data,
    });
  }

  async validate(data, url = null, method = "GET") {
    const validationUrl =
      url ||
      `${this.validationURL}val_id=${data.val_id}&store_id=${this.store_id}&store_passwd=${this.store_passwd}&v=1&format=json`;
    return httpCall({ url: validationUrl, method });
  }

  async initiateRefund(data, url = null, method = "GET") {
    const refundUrl =
      url ||
      `${this.refundURL}refund_amount=${data.refund_amount}&refund_remarks=${data.refund_remarks}&bank_tran_id=${data.bank_tran_id}&refe_id=${data.refe_id}&store_id=${this.store_id}&store_passwd=${this.store_passwd}&v=1&format=json`;
    return httpCall({ url: refundUrl, method });
  }

  async refundQuery(data, url = null, method = "GET") {
    const queryUrl =
      url ||
      `${this.refundQueryURL}refund_ref_id=${data.refund_ref_id}&store_id=${this.store_id}&store_passwd=${this.store_passwd}&v=1&format=json`;
    return httpCall({ url: queryUrl, method });
  }

  async transactionQueryBySessionId(data, url = null, method = "GET") {
    const queryUrl =
      url ||
      `${this.transactionQueryBySessionIdURL}sessionkey=${data.sessionkey}&store_id=${this.store_id}&store_passwd=${this.store_passwd}&v=1&format=json`;
    return httpCall({ url: queryUrl, method });
  }

  async transactionQueryByTransactionId(data, url = null, method = "GET") {
    const queryUrl =
      url ||
      `${this.transactionQueryByTransactionIdURL}tran_id=${data.tran_id}&store_id=${this.store_id}&store_passwd=${this.store_passwd}&v=1&format=json`;
    return httpCall({ url: queryUrl, method });
  }
}

export default SslCommerzPayment;
