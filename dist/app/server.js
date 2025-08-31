"use strict";
// Simulated Server
async function simulateRequest(url, method, body = null) {
    // API
    if (url.startsWith("api/")) {
        console.warn(api_routes);
        const route = api_routes[url];
        console.log("Getting route", route, url, method);
        if (route && route[method]) {
            try {
                const result = await route[method](body);
                return result;
            }
            catch (err) {
                return { status: 500, message: err.message, err };
            }
        }
        else {
            return { status: 404, message: "Route not found" };
        }
    }
}
