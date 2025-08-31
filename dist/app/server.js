var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Simulted Server
import { routes } from "./router/index.js";
export function simulateRequest(url_1, method_1) {
    return __awaiter(this, arguments, void 0, function* (url, method, body = null) {
        // API
        if (url.startsWith("/api/")) {
            const route = routes[url];
            if (route && route[method]) {
                try {
                    const result = yield route[method](body);
                    return { status: 200, data: result };
                }
                catch (err) {
                    return { status: 500, data: { error: err.message } };
                }
            }
            else {
                return { status: 404, data: { error: "Route not found" } };
            }
        }
        // Serve Static Files
        let filePath = url === "/" ? "index.html" : url;
        const ext = filePath.split(".").pop().toLowerCase();
        let contentType = "text/html";
        if (ext === "js")
            contentType = "text/javascript";
        if (ext === "css")
            contentType = "text/css";
        try {
            const response = yield fetch(filePath);
            if (!response.ok)
                throw new Error("File not found");
            const content = yield response.text();
            return { status: 200, data: content, contentType };
        }
        catch (err) {
            // Fallback SPA: always return index.html
            const html = yield fetch("index.html").then(r => r.text());
            return { status: 200, data: html, contentType: "text/html" };
        }
    });
}
