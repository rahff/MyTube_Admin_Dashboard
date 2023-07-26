import { AddVideoRequest } from "src/dashboard/video/core/ports/dtos/AddVideoRequest";
import { VideoMetaData } from "src/dashboard/video/core/ports/dtos/VideoMetaData";


export const fakeVideoMetaDataList: VideoMetaData[] = [
    {
        miniatureUrl: "http://localhost:4200/assets/miniature1.png",
        videoId: "123456789",
        description: "An amazing video for my channel",
        title: "The best video"
    },
    {
        miniatureUrl: "http://localhost:4200/assets/miniature2.png",
        videoId: "2345673",
        description: "A great video for my channel",
        title: "The greatest video"
    },
    {
        miniatureUrl: "http://localhost:4200/assets/miniature3.png",
        videoId: "345677654",
        description: "A wonderful video for my channel",
        title: "A wonderful video"
    },
    {
        miniatureUrl: "http://localhost:4200/assets/miniature4.png",
        videoId: "4567654",
        description: "A beautiful video for my channel",
        title: "The beautiful video"
    }
]
export const fakeVideoMetaDataListAfterRemoveOne: VideoMetaData[] = [
    {
        miniatureUrl: "http://localhost:4200/assets/miniature1.png",
        videoId: "123456789",
        description: "An amazing video for my channel",
        title: "The best video"
    },
    {
        miniatureUrl: "http://localhost:4200/assets/miniature3.png",
        videoId: "345677654",
        description: "A wonderful video for my channel",
        title: "A wonderful video"
    },
    {
        miniatureUrl: "http://localhost:4200/assets/miniature4.png",
        videoId: "4567654",
        description: "A beautiful video for my channel",
        title: "The beautiful video"
    }
]
export const addVideoRequest: AddVideoRequest = {
    miniature: new File([""], "miniature.png"),
    video: new File([""], "video.mp4"),
    description: "An amazing video for my channel",
    title: "The best video"
}
export const newVideoMetaData: VideoMetaData = {
    miniatureUrl: "http://localhost:4200/assets/miniature.png",
    videoId: "123456789",
    description: "An amazing video for my channel",
    title: "The best video"
}