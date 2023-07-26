import {contextBridge, ipcRenderer } from "electron";

console.log("preload");


contextBridge.exposeInMainWorld("electronApi", {
    fileSystemBridge: {
        saveFile: (file: File) => ipcRenderer.invoke('file:save', file)
    }
})