import { Inject, Injectable } from '@nestjs/common'
import {
  AsyncAdapter,
  NodeProvider,
  SyncAdapter,
  SyncProvider
} from '@stenodb/node'
import { MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } from './config.js'
import type { AsyncProvider } from '@stenodb/node'
import type { ClassEntity } from '@stenodb/utils'

@Injectable()
export class StenoService {
  private readonly provider: NodeProvider

  constructor(@Inject(MODULE_OPTIONS_TOKEN) options: typeof OPTIONS_TYPE) {
    this.provider = new NodeProvider(options)
  }

  async create<T>(
    fileName: string,
    entity: ClassEntity<T>,
    initialData?: T
  ): Promise<AsyncProvider<T>> {
    const adapter = new AsyncAdapter(fileName, entity, initialData)
    return await this.provider.create(adapter)
  }

  createSync<T>(
    fileName: string,
    entity: ClassEntity<T>,
    initialData?: T
  ): SyncProvider<T> {
    const adapter = new SyncAdapter(fileName, entity, initialData)
    return this.provider.createSync(adapter)
  }
}
