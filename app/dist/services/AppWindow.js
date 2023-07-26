"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appWindow = exports.AppWindow = void 0;
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
class AppWindow {
    constructor(screen, window) {
        this.screen = screen;
        this.window = window;
    }
    getWidth() {
        return this.screen.getPrimaryDisplay().workAreaSize.width;
    }
    getHeigth() {
        return this.screen.getPrimaryDisplay().workAreaSize.height;
    }
    initScreen() {
        this.window = new electron_1.BrowserWindow({
            x: 0,
            y: 0,
            width: this.getWidth(),
            height: this.getHeigth(),
            webPreferences: {
                preload: "../preload.js",
                nodeIntegration: false,
                allowRunningInsecureContent: false,
                contextIsolation: true
            },
        });
        this.window.loadURL(path_1.default.join("file:", __dirname, "../index.html"));
    }
    destroy() {
        var _a;
        (_a = this.window) === null || _a === void 0 ? void 0 : _a.destroy();
    }
}
exports.AppWindow = AppWindow;
exports.appWindow = new AppWindow(electron_1.screen, null);
