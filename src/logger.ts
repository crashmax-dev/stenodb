import { join } from 'node:path'
import pico from 'picocolors'
import winston, { createLogger } from 'winston'
import { LoggerOptions, LowLoggerOptions } from './types.js'

export class LoggerProvider {
  private readonly path: string
  private readonly options: LoggerOptions

  private readonly timestampFormatter = winston.format.timestamp({
    format: 'YYYY/MM/DD HH:mm:ss'
  })

  private readonly consoleFormatter = winston.format.printf((info) => {
    const timestamp = this.coloredTimestamp(info.timestamp)
    const level = this.coloredLevel(info.level)
    const message = this.coloredMessage(info.message)
    const args = info.args[0] ? this.coloredJSON(info.args[0]) : ''
    return `${timestamp} ${level} ${message}${args}`
  })

  private readonly fileFormatter = winston.format.printf((info) => {
    const { timestamp, level, message } = info
    const args = info.args[0]
      ? `\n${JSON.stringify(info.args[0], null, 2)}`
      : ''
    return `[${timestamp}] ${level.toUpperCase()} ${message}${args}`
  })

  constructor({ path, options }: LowLoggerOptions) {
    this.path = path
    this.options = options ?? { enabled: false }
  }

  private coloredTimestamp(timestamp: string): string {
    return pico.gray(`[${timestamp}]`)
  }

  private coloredMessage(message: string): string {
    return pico.white(message)
  }

  private coloredLevel(level: string): string {
    level = level.toUpperCase()
    switch (level) {
      case 'INFO':
        return pico.green(level)
      case 'WARN':
        return pico.yellow(level)
      case 'ERROR':
        return pico.red(level)
      default:
        return level
    }
  }

  private coloredJSON(json: any): string {
    return `\n${pico.cyan(JSON.stringify(json, null, 2))}`
  }

  createLogger(name: string) {
    const logger = createLogger({
      level: 'silly',
      silent: !this.options.enabled,
      format: winston.format.json(),
      transports: [
        new winston.transports.Console({
          level: 'verbose',
          format: winston.format.combine(
            this.timestampFormatter,
            this.consoleFormatter
          )
        }),
        new winston.transports.File({
          dirname: join(this.path, 'logs'),
          filename: `${name}.log`,
          format: winston.format.combine(
            this.timestampFormatter,
            this.fileFormatter
          )
        })
      ]
    })

    return new WinstonLogger(logger)
  }
}

export class WinstonLogger {
  constructor(private readonly logger: winston.Logger) {}

  info(message: string, ...args: any[]): void {
    this.logger.info(message, { args })
  }

  warn(message: string, ...args: any[]): void {
    this.logger.warn(message, { args })
  }

  error(message: string, ...args: any[]): void {
    this.logger.error(message, { args })
  }
}
