// Simulted Server
import { routes } from "./app/router/index.js"; 

export async function simulateRequest(url, method, body = null) {
  // API
  if (url.startsWith("/api/")) {
    const route = routes[url];
    if (route && route[method]) {
      try {
        const result = await route[method](body);
        return { status: 200, data: result };
      } catch (err) {
        return { status: 500, data: { error: err.message } };
      }
    } else {
      return { status: 404, data: { error: "Route not found" } };
    }
  }

  // Serve Static Files
  let filePath = url === "/" ? "index.html" : url;
  const ext = filePath.split(".").pop().toLowerCase();

  let contentType = "text/html";
  if (ext === "js") contentType = "text/javascript";
  if (ext === "css") contentType = "text/css";

  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error("File not found");

    const content = await response.text();
    return { status: 200, data: content, contentType };
  } catch (err) {
    // Fallback SPA: always return index.html
    const html = await fetch("index.html").then(r => r.text());
    return { status: 200, data: html, contentType: "text/html" };
  }
}
