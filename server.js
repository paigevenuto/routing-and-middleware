const PORT = 3000;
const server = require("./app");

server.listen(PORT, function () {
  console.log("App on port " + PORT.toString());
});
