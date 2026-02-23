class apiutils {

    constructor(apiContext, requestBody) {
        this.apiContext = apiContext;
        this.requestBody = requestBody;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.requestBody
        });
        const loginResponseJSON = await loginResponse.json();
        token = loginResponseJSON.token;
        return token;
    }

    async createOrder(orderRequest) {
        let respones = {};
        respones.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {

            data: orderRequest,
            headers: {
                'Authorization': respones.token,
                'Content-Type': 'application/json'

            },
        });
        const orderResponseJSON = await orderResponse.json();
        orderId = orderResponseJSON.orders[0];
        respones.orderId = orderId;
        return respones;
    }
}
module.exports = { apiutils };