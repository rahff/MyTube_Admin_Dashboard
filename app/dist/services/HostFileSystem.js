"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hostFileSystem = exports.HostFileSystem = void 0;
class HostFileSystem {
    constructor() { }
    static getInstance() {
        if (!HostFileSystem.INSTANCE) {
            HostFileSystem.INSTANCE = new HostFileSystem();
        }
        return HostFileSystem.INSTANCE;
    }
    saveFile(file) {
        throw new Error('Method not implemented.');
    }
}
exports.HostFileSystem = HostFileSystem;
HostFileSystem.INSTANCE = null;
exports.hostFileSystem = HostFileSystem.getInstance();
