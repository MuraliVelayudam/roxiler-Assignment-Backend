import app from "./app.js";
import { connectToDb } from "./config/db.js";
import seedDataToDb from "./config/seedDataToDb.js";
import { configuration } from "./config/config.js";

const port = configuration.port || 3000;

app.listen(port, async () => {
  await connectToDb();
  console.log(`Server running on Port : ${port}`);
  seedDataToDb();
});
