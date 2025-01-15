import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/posts.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(
  cors({
    origin: ["http://localhost:3000", "https://memory-mern.vercel.app"],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use("/posts", postRoutes);

const CONNECTION_URL =
  "mongodb+srv://MERN:mern123@cluster0.t9oit.mongodb.net/Post?retryWrites=true&w=majority&appName=Cluster0";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(error.message));

// mongoose.set('useFindAndModify', false);
