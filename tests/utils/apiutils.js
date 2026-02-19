class apiUtils {

    constructor(apiContext) {
        this.apiContext = apiContext;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: requestBody });
        const loginResponseJSON = await loginResponse.json();
        token = loginResponseJSON.token;
        return token;
    }

    async createOrder() {
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