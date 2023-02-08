import type { createLogger } from './logger.js'
import type { createRotation } from './rotation.js'
import type { Options } from 'rotating-file-stream'
import type { ILogObj, ISettingsParam, Logger } from 'tslog'

export interface LoggerOptions extends Omit<ISettingsParam<ILogObj>, 'name'> {
  rotation?: ReturnType<typeof createRotation>
}

export interface RotationOptions extends Options {
  path: string
}

export type CreateLogger =
  | ReturnType<typeof createLogger>
  | null
  | undefined
  | void

export type BaseLogger = Logger<ILogObj>
