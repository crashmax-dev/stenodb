import { Module } from '@nestjs/common'
import { ConfigurableModuleClass } from './config.js'
import { StenoService } from './stenodb.service.js'

@Module({
  providers: [StenoService],
  exports: [StenoService]
})
export class StenoModule extends ConfigurableModuleClass {}
