export interface FileSystem {
    saveFile(file: File): Promise<boolean>
}