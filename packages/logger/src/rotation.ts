import { createStream } from 'rotating-file-stream'
import { BaseLogger, RotationOptions } from './types.js'

export function createRotation(options: RotationOptions) {
  return (logger: BaseLogger) => {
    const stream = createStream(options.path, options)

    logger.attachTransport((log) => {
      stream.write(JSON.stringify(log) + '\n')
    })
  }
}
