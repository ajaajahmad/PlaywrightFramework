class apiUtils {

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
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {

            data: orderRequest,
            headers: {
                'Authorization': this.getToken(),
                'Content-Type': 'application/json'

            },
        });
        const orderResponseJSON = await orderResponse.json();
        orderId = orderResponseJSON.orders[0];
        return orderId;
    }
}