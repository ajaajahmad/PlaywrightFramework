class apiUtils {

    async getToken() {
        const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: requestBody });
        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJSON = await loginResponse.json();
        token = loginResponseJSON.token;

        const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {

            data: orderRequest,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'

            },
        });
        const orderResponseJSON = await orderResponse.json();
        orderId = orderResponseJSON.orders[0];
        return token;
    }


}