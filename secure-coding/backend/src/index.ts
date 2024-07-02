require("dotenv").config({
  path: `./.env.${process.env.NODE_ENV}`,
});
import { createApp } from "./app";
import { APP_PORT, MONGO_URI } from "./config"
import mongoose from "mongoose";

(async () => {
  if (!MONGO_URI) return;

  console.log(MONGO_URI)

  await mongoose.connect(MONGO_URI);

  const app = await createApp();

  app.listen(APP_PORT, () =>
    console.log(`App is lestening on port : ${APP_PORT}`)
  );
})();
