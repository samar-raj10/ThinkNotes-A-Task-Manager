import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

//creating an express app
const app = express();
const PORT = process.env.PORT || 5001;

//middleware
app.use(
  cors({
    origin: "http://localhost:8173",
  })
);
app.use(express.json()); //used for accessing the req.body(parse the JSON body)
app.use(rateLimiter);

// app.use((req,res,next) => {
//     console.log(`Request method is ${req.method} and Request URL is ${req.url}`);
//     next();
// })

//router
app.use("/api/notes", notesRoutes);

//connecting to database and app listening to the specified port
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on PORT:", PORT);
  });
});
