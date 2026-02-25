class ApiUtils {

    constructor(apiContext, requestBody) {
        this.apiContext = apiContext;
        this.requestBody = requestBody;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.requestBody
        });
        const loginResponseJSON = await loginResponse.json();
        const token = loginResponseJSON.token;
        return token;
    }

    async createOrder(orderRequest) {
        let responses = {};
        responses.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {

            data: orderRequest,
            headers: {
                'Authorization': respones.token,
                'Content-Type': 'application/json'

            },
        });
        const orderResponseJSON = await orderResponse.json();
        const orderId = orderResponseJSON.orders[0];
        responses.orderId = orderId;
        return responses;
    }
}
module.exports = { ApiUtils };