import { BehaviorSubject, Observable, of } from "rxjs";
import { VideoMetaData } from "../ports/dtos/VideoMetaData";
import { VideoDataSource } from "../ports/driven/VideoDataSource";
import { AddVideoRequest } from "../ports/dtos/AddVideoRequest";
import { Exception } from "src/shared/Exception";


export class VideoManager {

    private videoMetaDataList$ = new BehaviorSubject<VideoMetaData[]>([]);
    private isLoading$ = new BehaviorSubject<boolean>(false);
    private error$ = new BehaviorSubject<Exception | null>(null);

    public constructor(private videoDataSource: VideoDataSource){}

    public getVideoList(): Observable<VideoMetaData[]> {
        return this.videoMetaDataList$.asObservable();
    }
    
    public isLoading(): Observable<boolean> {
        return this.isLoading$.asObservable();
    }

    public getError(): Observable<Exception | null> {
        return this.error$.asObservable();
    }

    public async queryVideoList(): Promise<void> {
        await this.makeAsyncTask(this.videoDataSource.getVideoList(), this.setVideoList.bind(this));
    }

    public async addVideo(addVideoRequest: AddVideoRequest): Promise<void> {
        await this.makeAsyncTask(this.videoDataSource.addVideo(addVideoRequest), this.pushVideo.bind(this));
    }

    private setVideoList(result: VideoMetaData[]): void {
        this.videoMetaDataList$.next(result);
    }
    
    private pushVideo(result: VideoMetaData): void { 
        this.videoMetaDataList$.next([...this.videoMetaDataList$.value, result]);
    }

    public async remmoveVideo(videoId: string): Promise<void> {
        await this.makeAsyncTask(this.videoDataSource.removeVideo(videoId), this.deleteVideoFromList.bind(this));
    }

    private deleteVideoFromList(videoId: string): void {
        const newVideoList = this.videoMetaDataList$
        .value.filter((video) => video.videoId != videoId);
        this.videoMetaDataList$.next(newVideoList);
    }
    
    private async makeAsyncTask<T>(task: Promise<T>, update: Function): Promise<void> {
        try {
            this.isLoading$.next(true);
            const result = await task;
            update(result);
        } catch (error: any) {
            this.error$.next(error);
        }
        this.isLoading$.next(false);
    }
}