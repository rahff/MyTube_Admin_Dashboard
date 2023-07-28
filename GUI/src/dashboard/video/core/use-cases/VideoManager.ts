import { BehaviorSubject, Observable } from "rxjs";
import { VideoMetaData } from "../ports/dtos/VideoMetaData";
import { VideoDataSource } from "../ports/driven/VideoDataSource";
import { AddVideoRequest } from "../ports/dtos/AddVideoRequest";
import { AsyncTaskProcessor } from "./AsyncTaskProcessor";



export class VideoManager extends AsyncTaskProcessor {

    private videoMetaDataList$ = new BehaviorSubject<VideoMetaData[]>([]);

    public constructor(private videoDataSource: VideoDataSource){super()}

    public getVideoList(): Observable<VideoMetaData[]> {
        return this.videoMetaDataList$.asObservable();
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
}