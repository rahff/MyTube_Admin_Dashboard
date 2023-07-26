import { FileSystem } from '../interface/FileSystem';

export class HostFileSystem implements FileSystem {

    private static INSTANCE: FileSystem | null = null;

    public constructor(){}

    public static getInstance(): FileSystem {
        if(!HostFileSystem.INSTANCE){
            HostFileSystem.INSTANCE = new HostFileSystem()
        }
        return HostFileSystem.INSTANCE;
    }

    saveFile(file: File): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}

export const hostFileSystem = HostFileSystem.getInstance();