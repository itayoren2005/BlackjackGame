import express, { Express, Request, Response } from "express";
import cors from "cors";

const app: Express = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post("/process-sentence", (req: Request, res: Response) => {
  const sentence: string = req.body.sentence;
  const processedSentence: string = sentence.replace(/\s/g, '');
  res.json({ processedSentence });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
