import app from "./app.js";
import { configuration } from "./config/config.js";

const port = configuration.port;

app.listen(port, () => {
  console.log(`Server running on Port : ${port}`);
});
