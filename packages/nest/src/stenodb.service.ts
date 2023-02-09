import { Inject, Injectable } from '@nestjs/common'
import { AsyncAdapter, NodeProvider, SyncAdapter } from '@stenodb/node'
import { MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } from './config.js'
import type { Steno } from '@stenodb/node'

@Injectable()
export class StenoService {
  private readonly provider: NodeProvider

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private readonly options: typeof OPTIONS_TYPE
  ) {
    this.provider = new NodeProvider(options.path)
  }

  create<T>(
    name: string,
    entity: Steno.Entity<T>,
    initialData?: T
  ): Steno.NodeProvider<T> {
    const adapter = new SyncAdapter(name, entity, initialData)
    const db = this.provider.createSync(adapter)
    db.read()
    return db
  }

  async createAsync<T>(
    name: string,
    entity: Steno.Entity<T>,
    initialData?: T
  ): Promise<Steno.NodeProvider<T>> {
    const adapter = new AsyncAdapter(name, entity, initialData)
    const db = this.provider.createAsync(adapter)
    await db.read()
    return db
  }
}
