import dotenv from "dotenv";
dotenv.config();

import express from "express";
import OpenAI from "openai";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/rewrite", async (req, res) => {
  try {
    const userText = req.body.text;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Rewrite the given text clearly." },
        { role: "user", content: userText }
      ]
    });

    res.json({
      result: response.choices[0].message.content
    });

  } catch (error) {
    console.error(error);
    res.json({ result: "Error rewriting text" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
