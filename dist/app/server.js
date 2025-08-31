"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Simulated Server
function simulateRequest(url_1, method_1) {
    return __awaiter(this, arguments, void 0, function* (url, method, body = null) {
        // API
        if (url.startsWith("api/")) {
            console.warn(api_routes);
            const route = api_routes[url];
            console.log("Getting route", route, url, method);
            if (route && route[method]) {
                try {
                    const result = yield route[method](body);
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
    });
}
