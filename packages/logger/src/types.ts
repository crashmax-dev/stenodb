import type { createLogger } from './logger.js'
import type { Options } from 'rotating-file-stream'
import type { ILogObj, ISettingsParam, Logger } from 'tslog'

export interface LoggerOptions extends Omit<ISettingsParam<ILogObj>, 'name'> {
  rotation?: RotationOptions
}

export interface RotationOptions extends Options {
  path: string
}

export type CreateLogger = ReturnType<typeof createLogger> | undefined
export type BaseLogger = Logger<ILogObj>
