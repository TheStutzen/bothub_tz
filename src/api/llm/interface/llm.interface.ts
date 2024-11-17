import { IErrorsType } from '../../../shared/interface/shared.interface'

export interface ILlmGenerateText {
  model: string
  text: any
}

export interface ILlmGenerateSpeech {
  model: string
  text: any
  voice: any
  format: any
  speed: number
}

export interface ILlmGenerateImage {
  model: string
  text: any
  count: number
  size: any
}

export interface ILlmGenerateVision {
  model: string
  text: any
  imageUrl: any
}

export interface IGenerateTextResponse {
  ok: boolean
  message: string
  errors: IErrorsType[]
}

export interface IGenerateTextStreamResponse {
  message: string
  errors: IErrorsType[]
}
