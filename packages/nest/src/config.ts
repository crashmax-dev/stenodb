import { ConfigurableModuleBuilder } from '@nestjs/common'
import type { Steno } from '@stenodb/node'

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE
} = new ConfigurableModuleBuilder<Steno.NodeProviderOptions>()
  .setExtras({ isGlobal: false }, (definition, extras) => ({
    ...definition,
    global: extras.isGlobal
  }))
  .build()
