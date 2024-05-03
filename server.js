const PORT = 8000
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(express.json())
app.use(cors())

const {GoogleGenerativeAI} = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.LANGUAGE_MODEL_API_KEY)



app.get('/prompt/:text', async(req, res) => {
    const model = genAI.getGenerativeModel({model: "gemini-pro"})
    const text = req.params.text
    const chat = model.startChat({
        history:[{
            role: "user",
            parts: [{ text: "Hello" }],
        },
        {   role: "model",
            parts: [{ text: "Hi" }],
        }
    ]
    })
    const result = await chat.sendMessage(text)
    const response = result.response;
    const data = response.text()
    console.log(data);
    res.send(data)
})
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
