import express from 'express';
const app = express ();
const PORT = 8000
import { GoogleGenAI} from "@google/genai";
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
app.use(express.json())
app.use(cors())


const apiKey = process.env.apiKey;
const ai = new GoogleGenAI({apiKey});
app.get('/prompt/:text', async function main(req, res) {
  const text = req.params.text
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: text,
  }); 
  const data = response.text
  console.log(data);
  res.send(data)
  console.log(response.contents);
})


app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
