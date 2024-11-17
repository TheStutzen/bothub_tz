import * as nodemailer from 'nodemailer'

export class NodemailerService {
  private transporter: nodemailer.Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mail.ru',
      port: 465,
      secure: true,
      auth: {
        user: process.env.USERMAILER,
        pass: process.env.PASSMAILER
      },
      pool: true,
      rateDelta: 2000,
      rateLimit: 1
    })
  }

  async sendMail(options: nodemailer.SendMailOptions): Promise<void> {
    try {
      const info = await this.transporter.sendMail(options)
      console.info('Сообщение отправлено: %s', info.messageId)
    } catch (error) {
      console.error('Ошибка отправки сообщения:', error)
    }
  }
}
