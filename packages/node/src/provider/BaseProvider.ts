export class BaseProvider<T> {
  #data: T | null = null
  #initialData: T | null = null

  get data(): T | null {
    return this.#data
  }

  set data(data: T | null) {
    this.#data = data
  }

  get initialData(): T | null {
    return this.#initialData
  }

  set initialData(data: T | undefined | null) {
    if (!data) return
    this.#initialData = data
  }
}
