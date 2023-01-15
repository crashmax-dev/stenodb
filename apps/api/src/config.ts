import 'dotenv/config'
import { cleanEnv, num, str } from 'envalid'

export const env = cleanEnv(process.env, {
  HOST: str({ default: 'localhost' }),
  PORT: num({ default: 5000 })
})

export const server = {
  host: env.HOST,
  port: env.PORT,
  href: `http://${env.HOST}:${env.PORT}`
}
