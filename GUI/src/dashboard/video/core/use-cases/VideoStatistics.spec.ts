import { fakeVideoStatistics } from "src/data/statistics.data";
import { VideoStats } from "../ports/dtos/VideoStatistics";
import { VideoStatistics } from "./VideoStatistics";
import { VideoDataSource } from "../ports/driven/VideoDataSource";
import { fakeAsync } from "@angular/core/testing";
import { after1second, dataSourceWillReturnAfter1Second, verifyIsLoadindWhileprocessing } from "../utils/test.utils";


describe("VideoStatistics: Core use-cases", () => {

    let videoStatistics: VideoStatistics;
    let videoDataSource: jasmine.SpyObj<VideoDataSource>;
    beforeEach(() => {
        videoDataSource = jasmine.createSpyObj("VideoDataSource", ["getVideoStats"])
        videoStatistics = new VideoStatistics(videoDataSource)
    })

    it("should retrieve statistics for a given video", async () => {
        videoDataSource.getVideoStats.and.returnValue(new Promise((complete) => complete(fakeVideoStatistics)))
        await videoStatistics.queryStatistics("videoId");
        videoStatistics.getVideoStatistics().subscribe((statistics: VideoStats) => {
            expect(statistics).toEqual(fakeVideoStatistics);
        })
    })

    it("should be in loading state while processing", fakeAsync(() => {
        let isLoading = false;
        dataSourceWillReturnAfter1Second(videoDataSource, "getVideoStats", fakeVideoStatistics)
        videoStatistics.queryStatistics("videoId");
        isLoading = verifyIsLoadindWhileprocessing(isLoading, videoStatistics);
        expect(isLoading).toBeTrue();
        after1second();
        isLoading = verifyIsLoadindWhileprocessing(isLoading, videoStatistics);
        expect(isLoading).toBeFalse();
    }))
})