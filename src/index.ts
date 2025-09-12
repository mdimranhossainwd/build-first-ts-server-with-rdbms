import cors from "cors";
import express, { Request, Response } from "express";
import router from "./route/route";

const app = express();
const PORT = 5000;

app.use(cors());

app.use(express.json());
app.use("/api", router);

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send("Server with CORS is running successfully!");
});

// Start server
app.listen(PORT, () => {
  console.log(` Server started on ${PORT}`);
});
