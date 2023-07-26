import { ipcMain } from "electron";
import { FileSystem } from "../interface/FileSystem";
import { hostFileSystem } from "./HostFileSystem";


export class InterProcessBridge {

    public constructor(private ipc: Electron.IpcMain,
                       private fs: FileSystem){}

    public init(): void {
        this.ipc.handle('file:save', this.saveFileHandler.bind(this))
    }

    private saveFileHandler(event: any, file: File): void {
        this.fs.saveFile(file);
    }
}

export const ipcBridge = new InterProcessBridge(ipcMain, hostFileSystem);
