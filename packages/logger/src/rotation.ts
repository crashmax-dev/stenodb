import { createStream } from 'rotating-file-stream'
import { BaseLogger, RotationOptions } from './types.js'

export function createRotation(options: RotationOptions) {
  return (logger: BaseLogger) => {
    const stream = createStream(options.path + '.log', options)

    logger.attachTransport((log) => {
      const meta = log['_meta']
      const message = `${meta?.date.toISOString()} ${meta?.logLevelName} [${
        meta?.name
      }] ${log[0]}`
      stream.write(message + '\n')
    })
  }
}
