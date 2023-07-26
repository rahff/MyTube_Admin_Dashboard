"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipcBridge = exports.InterProcessBridge = void 0;
const electron_1 = require("electron");
const HostFileSystem_1 = require("./HostFileSystem");
class InterProcessBridge {
    constructor(ipc, fs) {
        this.ipc = ipc;
        this.fs = fs;
    }
    init() {
        this.ipc.handle('file:save', this.saveFileHandler.bind(this));
    }
    saveFileHandler(event, file) {
        this.fs.saveFile(file);
    }
}
exports.InterProcessBridge = InterProcessBridge;
exports.ipcBridge = new InterProcessBridge(electron_1.ipcMain, HostFileSystem_1.hostFileSystem);
