const { httpGet } = require('./mock-http-interface');

const HTTPOK = 200;

const getArnieQuotes = (urls) =>
  Promise.all(
    urls.map((url) =>
      httpGet(url)
        .then((res) => {
          const message = JSON.parse(res.body).message;
          if (res.status === HTTPOK) {
            return {"Arnie Quote": message};
          }
          return {"FAILURE": message};
        })
        // Not required for this test since the mocked httpGet can't throw and returns proper JSON,
        // but the library that replaces this in the future may not do so
        .catch((err) => {
          // I assume we dont mind leaking a HTTP or JSON error to the user here
          return {"FAILURE": err.message};
        })));

module.exports = {
  getArnieQuotes,
};
