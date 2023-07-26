import { Observable } from "rxjs";
import { VideoMetaData } from "../dtos/VideoMetaData";
import { AddVideoRequest } from "../dtos/AddVideoRequest";

export interface VideoDataSource {
    getVideoList(): Promise<VideoMetaData[]>;
    addVideo(addVideoRequest: AddVideoRequest): Promise<VideoMetaData>;
    removeVideo(videoId: string): Promise<string>;
}