import { BrowserWindow, screen } from "electron";
import path from "path";

export class AppWindow {
    public constructor(private screen: Electron.Screen,
                       private window: BrowserWindow | null){}

    public getWidth(): number {
        return this.screen.getPrimaryDisplay().workAreaSize.width;
    }

    public getHeigth(): number {
        return this.screen.getPrimaryDisplay().workAreaSize.height;
    }

    public initScreen(): void {
        this.window = new BrowserWindow({
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
          })
          this.window.loadURL(path.join("file:", __dirname, "../index.html"));
    }

    public destroy(): void {
        this.window?.destroy();
    }
}
export const appWindow = new AppWindow(screen, null);