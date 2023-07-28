import { Observable } from "rxjs";
import { VideoMetaData } from "../dtos/VideoMetaData";
import { AddVideoRequest } from "../dtos/AddVideoRequest";
import { VideoStats } from "../dtos/VideoStatistics";

export interface VideoDataSource {
    getVideoList(): Promise<VideoMetaData[]>;
    addVideo(addVideoRequest: AddVideoRequest): Promise<VideoMetaData>;
    removeVideo(videoId: string): Promise<string>;
    getVideoStats(videoId: string): Promise<VideoStats>
}