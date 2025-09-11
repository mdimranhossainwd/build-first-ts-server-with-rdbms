import cors from "cors";
import express, { Request, Response } from "express";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.send("Server with CORS is running successfully!");
});

// Start server
app.listen(PORT, () => {
  console.log(` Server started on ${PORT}`);
});
