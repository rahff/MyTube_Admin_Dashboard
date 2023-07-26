export interface LocalStorage {
    saveObject<T>(key: string, data: T): void
}