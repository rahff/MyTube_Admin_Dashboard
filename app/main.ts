import { app } from "electron";
import { AppWindow, appWindow } from "./services/AppWindow";
import { InterProcessBridge, ipcBridge } from "./services/InterProcess";



class Application {

    private static INSTANCE: Application | null = null;

    private constructor(private app: Electron.App,
                        private window: AppWindow,
                        private ipc: InterProcessBridge){}

    public static getInstance(app: Electron.App, window: AppWindow, ipc: InterProcessBridge): Application {
        if(!Application.INSTANCE){
            Application.INSTANCE = new Application(app, window,ipc)
        }
        return Application.INSTANCE
    }

    public start(): void {
        this.initApp();
        this.ipc.init();
    }

    private initApp(): void {
        this.app.on("ready", this.startWindow.bind(this));
        this.app.on("quit", this.destroyWindow.bind(this));
    }

    private startWindow(): void {
       this.window.initScreen()
    }

    private destroyWindow(): void {
        this.window.destroy();
        app.quit();
    }
}


  const application = Application.getInstance(app, appWindow, ipcBridge);

  application.start();
