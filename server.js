const app = require("./app");
const port = 3000;
require("dotenv").config();

app.listen(port, () => {
  console.log(`The server is running at port `, port);
});
 