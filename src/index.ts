import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routers";

dotenv.config();
if (!process.env.PORT) {
  console.error("PORT not found");
}

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Server Running on port: ${port}`);
});

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  console.log("MONGODB_URI not found ");
}
mongoose.connection.on("error", () => {
  console.log("Could not connect to mongodb");
});
mongoose.connection.on("connected", () => {
  console.log("Connected to mongodb!");
});
