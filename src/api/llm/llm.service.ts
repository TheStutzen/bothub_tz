import { OpenAi } from '../../libs/openai'
import {
  IGenerateTextResponse,
  IGenerateTextStreamResponse,
  ILlmGenerateSpeech,
  ILlmGenerateText
} from './interface/llm.interface'
import Models from '../../models'
import { UsersService } from '../users/users.service'

export class LlmService {
  openAi = new OpenAi()
  usersService = new UsersService()

  async generateText(
    req: any,
    params: ILlmGenerateText
  ): Promise<IGenerateTextResponse> {
    const user = await Models.UsersModel.findByUserId(req.session.user.userId)

    if (+user.balance <= 0) {
      return {
        ok: false,
        message: null,
        errors: [
          {
            field: 'balance',
            message: req.__('LLM.generateText.lowBalance')
          }
        ]
      }
    }

    const modelMap = {
      gpt3: { modelName: 'gpt-3.5-turbo', balanceCost: 10 },
      gpt4: { modelName: 'gpt-4o', balanceCost: 20 }
    }

    const { modelName, balanceCost } =
      modelMap[params?.model] || modelMap['gpt3']

    const res = await this.openAi.generateText(modelName, params.text)

    if (res.ok) {
      await this.usersService.writeOffBalanceUser({
        userId: user.userId,
        balance: balanceCost
      })

      return { ok: true, message: res.message, errors: null }
    }

    return {
      ok: false,
      message: null,
      errors: [
        {
          field: 'generateText',
          message: res.err.message
        }
      ]
    }
  }

  async generateTextStream(
    req: any,
    res: any,
    params: ILlmGenerateText
  ): Promise<IGenerateTextStreamResponse> {
    const user = await Models.UsersModel.findByUserId(req.session.user.userId)

    if (+user.balance <= 0) {
      return {
        message: null,
        errors: [
          {
            field: 'balance',
            message: req.__('LLM.generateTextStream.lowBalance')
          }
        ]
      }
    }

    const modelMap = {
      gpt3: { modelName: 'gpt-3.5-turbo', balanceCost: 10 },
      gpt4: { modelName: 'gpt-4o', balanceCost: 20 }
    }

    const { modelName, balanceCost } =
      modelMap[params?.model] || modelMap['gpt3']

    try {
      await this.openAi.generateTextPart(
        res,
        modelName,
        params.text,
        balanceCost,
        user.userId
      )
    } catch (error) {
      res.write(
        `event: error\ndata: ${JSON.stringify({ error: error.message })}\n\n`
      )
      res.end()
    }
  }

  async generateSpeech(req: any, params: ILlmGenerateSpeech) {
    const user = await Models.UsersModel.findByUserId(req.session.user.userId)

    if (+user.balance <= 0) {
      return {
        errors: {
          field: 'balance',
          message:
            'Нехватает средств для выполнения запроса, пожалуйста пополните баланс'
        }
      }
    }

    const modelMap = {
      dalle3: { modelName: 'dall-e-3', balanceCost: 30 }
    }

    const { modelName, balanceCost } =
      modelMap[params?.model] || modelMap['dalle3']

    const res = await this.openAi.generateSpeech(
      modelName,
      params.text,
      params.voice,
      params.format,
      params.speed
    )

    if (res.ok) {
      await this.usersService.writeOffBalanceUser({
        userId: user.userId,
        balance: balanceCost
      })

      return { ok: true }
    }

    return {
      errors: {
        field: 'generateText',
        message: res.err.message
      }
    }
  }
}
