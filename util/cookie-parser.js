function parseCookies(req) {
  const header = req.headers.cookie;
  if (!header) return {};
  
  return header.split(";").reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split("=");
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {});
}

module.exports = { parseCookies };