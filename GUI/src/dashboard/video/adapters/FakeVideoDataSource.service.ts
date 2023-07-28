import { Injectable } from "@angular/core";
import { VideoDataSource } from "../core/ports/driven/VideoDataSource";
import { AddVideoRequest } from "../core/ports/dtos/AddVideoRequest";
import { VideoMetaData } from "../core/ports/dtos/VideoMetaData";
import { VideoStats } from "../core/ports/dtos/VideoStatistics";
import { fakeVideoMetaDataList, newVideoMetaData } from "src/data/video.data";
import { fakeVideoStatistics } from "src/data/statistics.data";



@Injectable({
    providedIn: "root"
})
export class FakeVideoDataSource implements VideoDataSource {
    
    private data: VideoMetaData[];

    public constructor(){
        this.data = [...fakeVideoMetaDataList]
    }

    public async getVideoList(): Promise<VideoMetaData[]> {
        return new Promise((complete) => {
            setTimeout(() => {
                complete(this.data);
            }, 1000);
        })
    }

    public async addVideo(addVideoRequest: AddVideoRequest): Promise<VideoMetaData> {
        this.data.push(newVideoMetaData)
        return new Promise((complete) => {
            setTimeout(() => {
                complete(newVideoMetaData);
            }, 1000);
        })
    }

    public async removeVideo(videoId: string): Promise<string> {
        this.data = this.data.filter((video) => video.videoId !== videoId)
        return new Promise((complete) => {
            setTimeout(() => {
                complete(videoId);
            }, 1000);
        })
    }
    
    public async getVideoStats(videoId: string): Promise<VideoStats> {
        return new Promise((complete) => {
            setTimeout(() => {
                complete(fakeVideoStatistics);
            }, 1000);
        })
    }

}