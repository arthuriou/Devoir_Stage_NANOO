import express from "express";
import { Request, Response } from "express";
import { HTTP_STATUS, RESPONSE_MESSAGE } from "./utils/error_message";
import userRoutes from "./routes/userRoute";
import noteRoutes from "./routes/noteRoute";
import postRoutes from "./routes/postRoute";
import commentRoutes from "./routes/commentRoute";
import republicationRoutes from "./routes/republicationRoute";
const app = express();
app.use(express.json());

const PORT = 3000;
const API_URL = "http://localhost:3000";

app.get("/", (req: Request, res: Response) => {
  res.send("Juste un simple serveur express avec TypeScript !");
});

app.get("/healthCheck", (req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK).json({
    status: "ok",
    message: RESPONSE_MESSAGE.OK,
    timeStamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});
app.use("/api/auth", userRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/republications", republicationRoutes);

app.listen(PORT, () => {
  console.log("le serveur est lancé sur le port : " + API_URL);
});
