import * as fs from 'fs'
import OpenAI from 'openai'
import { UsersService } from '../../api/users/users.service'

export class OpenAi {
  openai = new OpenAI({
    apiKey: process.env.API_KEY,
    baseURL: process.env.BASE_URL
  })
  usersService = new UsersService()

  async generateText(model: string, text: any) {
    try {
      const result = await this.openai.chat.completions.create({
        messages: [{ role: 'user', content: `${text}` }],
        model
      })

      const messageContent = result.choices[0]?.message?.content

      if (messageContent) {
        return { ok: true, message: messageContent }
      }

      return { ok: false, message: 'Запрос пришёл без ответа' }
    } catch (err) {
      return { ok: false, err }
    }
  }

  async generateTextPart(
    res: any,
    model: string,
    text: any,
    balanceCost: number,
    userId: number
  ) {
    const stream = await this.openai.chat.completions.create({
      messages: [{ role: 'user', content: `${text}` }],
      model,
      stream: true
    })

    for await (const chunk of stream) {
      const part = chunk.choices[0].delta?.content ?? ''
      if (part) {
        res.write(`data: ${JSON.stringify({ content: part })}\n\n`)
      }
    }

    res.write(`event: end\ndata: {"done": true}\n\n`)

    await this.usersService.writeOffBalanceUser({
      userId,
      balance: balanceCost
    })

    res.end()
  }

  async generateImage(model: string, text: any, count: number, size: any) {
    const response = await this.openai.images.generate({
      model,
      prompt: `${text}`,
      n: count,
      size
    })

    const imageUrl = response.data[0].url

    return imageUrl
  }

  async generateSpeech(
    model: string,
    text: any,
    voice: any,
    format: any,
    speed: number
  ) {
    try {
      const req = await this.openai.audio.speech.create({
        model,
        voice,
        input: `${text}`,
        response_format: format,
        speed
      })

      const buffer = Buffer.from(await req.arrayBuffer())

      await fs.promises.writeFile('output.mp3', buffer)

      return { ok: true }
    } catch (err) {
      return err
    }
  }

  async generateVision(model: string, text: any, imageUrl: string) {
    const res = await this.openai.chat.completions.create({
      model,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: `${text}` },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl
              }
            }
          ]
        }
      ]
    })

    return res
  }
}
