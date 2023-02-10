import { Inject, Injectable } from '@nestjs/common'
import { AsyncAdapter, NodeProvider } from '@stenodb/node'
import { MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } from './config.js'
import type { Steno } from '@stenodb/node'

@Injectable()
export class StenoService {
  private readonly provider: NodeProvider

  constructor(@Inject(MODULE_OPTIONS_TOKEN) options: typeof OPTIONS_TYPE) {
    this.provider = new NodeProvider(options)
  }

  async create<T>(
    fileName: string,
    entity: Steno.Entity<T>,
    initialData?: T
  ): Promise<Steno.NodeProvider<T>> {
    const adapter = new AsyncAdapter(fileName, entity, initialData)
    return await this.provider.create(adapter)
  }
}
