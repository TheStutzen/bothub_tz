import { ILlmGenerateText } from './interface/llm.interface'
import { LlmService } from './llm.service'

export class LlmController {
  llmService = new LlmService()

  async generateText(req: any, res: any) {
    const params: ILlmGenerateText = req.body

    try {
      const result = await this.llmService.generateText(req, params)

      if (result.ok) {
        res.status(200).json(result)
      } else {
        res.status(400).json(result)
      }
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  async generateTextPart(req: any, res: any) {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.flushHeaders()

    const params: ILlmGenerateText = req.body

    try {
      await this.llmService.generateTextStream(req, res, params)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
}
