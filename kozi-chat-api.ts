import express from "express"
import cors from "cors"
import bodyParser from "body-parser"

const app = express()
app.use(cors())
app.use(bodyParser.json())

const OPENROUTER_API_KEY = ''

async function getAIAnswer(question: string): Promise<string> {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo", // Free model
      messages: [{ role: "user", content: `Answer about KOZi: ${question}` }]
    })
  })
  const data = await response.json()
  return data.choices?.[0]?.message?.content || "Sorry, I couldn't get an answer from AI."
}

app.post("/api/kozi-chat", async (req, res) => {
  const { question } = req.body
  const answer = await getAIAnswer(question)
  res.json({ answer })
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`KOZi Chat API running on port ${PORT}`)
})