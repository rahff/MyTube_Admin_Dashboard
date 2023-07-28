import { BehaviorSubject, Observable, of } from "rxjs";
import { VideoStats, nullVideoStats } from "../ports/dtos/VideoStatistics";
import { fakeVideoStatistics } from "src/data/statistics.data";
import { VideoDataSource } from "../ports/driven/VideoDataSource";
import { AsyncTaskProcessor } from "./AsyncTaskProcessor";



export class VideoStatistics extends AsyncTaskProcessor {

    private videoStats$ = new BehaviorSubject<VideoStats>(nullVideoStats);


    public constructor(private videoDataSource: VideoDataSource){super()}

    public async queryStatistics(videoId: string): Promise<void> {
        this.makeAsyncTask(this.videoDataSource.getVideoStats(videoId), this.setStats.bind(this));
    }

    private setStats(stats: VideoStats): void {
        this.videoStats$.next(stats);
    }

    public getVideoStatistics(): Observable<VideoStats> {
        return this.videoStats$.asObservable();
    }

}