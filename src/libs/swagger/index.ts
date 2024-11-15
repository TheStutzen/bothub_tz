import * as swaggerJSDoc from 'swagger-jsdoc'
import { join } from 'path'

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BotHub API',
      version: '0.0.1',
      description: 'API Documentation for Bothub service'
    },
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'sessionId'
        }
      }
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: [join(__dirname, '../../routes/index.ts')]
})

export default swaggerSpec
