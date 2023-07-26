"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const AppWindow_1 = require("./services/AppWindow");
const InterProcess_1 = require("./services/InterProcess");
class Application {
    constructor(app, window, ipc) {
        this.app = app;
        this.window = window;
        this.ipc = ipc;
    }
    static getInstance(app, window, ipc) {
        if (!Application.INSTANCE) {
            Application.INSTANCE = new Application(app, window, ipc);
        }
        return Application.INSTANCE;
    }
    start() {
        this.initApp();
        this.ipc.init();
    }
    initApp() {
        this.app.on("ready", this.startWindow.bind(this));
        this.app.on("quit", this.destroyWindow.bind(this));
    }
    startWindow() {
        this.window.initScreen();
    }
    destroyWindow() {
        this.window.destroy();
        electron_1.app.quit();
    }
}
Application.INSTANCE = null;
const application = Application.getInstance(electron_1.app, AppWindow_1.appWindow, InterProcess_1.ipcBridge);
application.start();
