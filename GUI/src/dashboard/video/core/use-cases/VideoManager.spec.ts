import { addVideoRequest, fakeVideoMetaDataList, fakeVideoMetaDataListAfterRemoveOne, newVideoMetaData } from "src/data/video.data";
import { VideoMetaData } from "../ports/dtos/VideoMetaData";
import { VideoManager } from "./VideoManager";
import { VideoDataSource } from "../ports/driven/VideoDataSource";
import { fakeAsync } from "@angular/core/testing";
import { Exception, UnknowException } from "src/shared/Exception";
import { after1second, dataSourceWillReturnListAfter1Second, dataSourceWillReturnNewVideoAfter1Second, dataSourceWillReturnRemovedVideoIdAfter1Second, verifyIsLoadindWhileprocessing, withFakeListAsInitialState, dataSourceWillRejectAddingVideoAfter1Second, dataSourceWillFailRemovingVideoAfter1Second } from "../utils/test.utils";



describe("VideoManager: Core use-case", () => {
    let videoManager: VideoManager;
    let videoDataSource: jasmine.SpyObj<VideoDataSource>
    let isLoading: boolean;
    

    beforeEach(() => {
        isLoading = false;
        videoDataSource = jasmine.createSpyObj("VideoDataSource", ["getVideoList", "addVideo", "removeVideo"])
        videoManager = new VideoManager(videoDataSource)
    })

    it("Which holds a list of video metaData ", async () => {
        await withFakeListAsInitialState(videoDataSource, videoManager);
        videoManager.getVideoList().subscribe((list: VideoMetaData[]) => {
            expect(list).toEqual(fakeVideoMetaDataList);
        });
    });

    it("Can add a new video", fakeAsync(async () => {
        await withFakeListAsInitialState(videoDataSource, videoManager);
        dataSourceWillReturnNewVideoAfter1Second(videoDataSource);
        videoManager.addVideo(addVideoRequest);
        isLoading = verifyIsLoadindWhileprocessing(isLoading, videoManager);
        expect(isLoading).toBeTrue();
        after1second();
        isLoading = verifyIsLoadindWhileprocessing(isLoading, videoManager);
        expect(isLoading).toBeFalse();
        videoManager.getVideoList().subscribe((list: VideoMetaData[]) => {
            expect(list).toEqual([...fakeVideoMetaDataList, newVideoMetaData]);
        });
    }));

    it("adding video may fail", fakeAsync(async () => {
        await withFakeListAsInitialState(videoDataSource, videoManager);
        dataSourceWillRejectAddingVideoAfter1Second(videoDataSource);
        videoManager.addVideo(addVideoRequest);
        after1second();
        videoManager.getVideoList().subscribe((list: VideoMetaData[]) => {
            expect(list).toEqual(fakeVideoMetaDataList);
        });
        videoManager.getError().subscribe((error: Exception | null) => {
            expect(error).toBeInstanceOf(UnknowException);
        })
    }))

    it("should be in loading state while processing", fakeAsync(() => {
        dataSourceWillReturnListAfter1Second(videoDataSource);
        videoManager.queryVideoList();
        isLoading = verifyIsLoadindWhileprocessing(isLoading, videoManager);
        expect(isLoading).toBeTrue();
        after1second();
        isLoading = verifyIsLoadindWhileprocessing(isLoading, videoManager);
        expect(isLoading).toBeFalse();
    }))

    it("can remove a video", fakeAsync(async ()=> {
        await withFakeListAsInitialState(videoDataSource, videoManager);
        dataSourceWillReturnRemovedVideoIdAfter1Second(videoDataSource);
        videoManager.remmoveVideo(fakeVideoMetaDataList[1].videoId);
        isLoading = verifyIsLoadindWhileprocessing(isLoading, videoManager);
        expect(isLoading).toBeTrue();
        after1second();
        isLoading = verifyIsLoadindWhileprocessing(isLoading, videoManager);
        expect(isLoading).toBeFalse();
        videoManager.getVideoList().subscribe((list: VideoMetaData[]) => {
            expect(list).toEqual(fakeVideoMetaDataListAfterRemoveOne);
        });
    }));

    it("Removing video may fail", fakeAsync(async ()=> {
        videoDataSource.getVideoList.and.returnValue(new Promise((complete) => complete(fakeVideoMetaDataList)));
        await videoManager.queryVideoList();
        dataSourceWillFailRemovingVideoAfter1Second(videoDataSource);
        videoManager.remmoveVideo(fakeVideoMetaDataList[1].videoId);
        isLoading = verifyIsLoadindWhileprocessing(isLoading, videoManager);
        expect(isLoading).toBeTrue();
        after1second();
        isLoading = verifyIsLoadindWhileprocessing(isLoading, videoManager);
        expect(isLoading).toBeFalse();
        videoManager.getVideoList().subscribe((list: VideoMetaData[]) => {
            expect(list).toEqual(fakeVideoMetaDataList);
        });
        videoManager.getError().subscribe((error: Exception | null) => {
            expect(error).toBeInstanceOf(UnknowException)
        });
    }));
})