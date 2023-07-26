import { fakeVideoMetaDataList, newVideoMetaData } from "src/data/video.data";
import { VideoDataSource } from "../ports/driven/VideoDataSource";
import { tick, flush } from "@angular/core/testing";
import { VideoManager } from "../use-cases/VideoManager";
import { UnknowException } from "src/shared/Exception";


export const dataSourceWillReturnListAfter1Second = (videoDataSource: jasmine.SpyObj<VideoDataSource>) => {
    videoDataSource.getVideoList.and.returnValue(new Promise((complete) => { 
        setTimeout(() => {
            complete(fakeVideoMetaDataList);
        }, 1000);
    }));
}

export const dataSourceWillReturnNewVideoAfter1Second = (videoDataSource: jasmine.SpyObj<VideoDataSource>) => {
    videoDataSource.addVideo.and
    .returnValue(new Promise((complete) => {
        setTimeout(() => {
            complete(newVideoMetaData);
        }, 1000);
    }));
}

export const dataSourceWillReturnRemovedVideoIdAfter1Second = (videoDataSource: jasmine.SpyObj<VideoDataSource>) => {
    videoDataSource.removeVideo.and
    .returnValue(new Promise((complete) => {
        setTimeout(() => {
            complete("2345673");
        }, 1000);
    }));
}

export const dataSourceWillFailRemovingVideoAfter1Second = (videoDataSource: jasmine.SpyObj<VideoDataSource>) => {
    videoDataSource.removeVideo.and
    .returnValue(new Promise((_, reject) => {
        setTimeout(() => {
            reject(new UnknowException("internal server error"));
        }, 1000);
    }));
}

export const dataSourceWillRejectAddingVideoAfter1Second = (videoDataSource: jasmine.SpyObj<VideoDataSource>) => {
    videoDataSource.addVideo.and
    .returnValue(new Promise((_, reject) => {
        setTimeout(() => {
            reject(new UnknowException("internal server error"));
        }, 1000);
    }));
}

export const verifyIsLoadindWhileprocessing = (isLoading: boolean, videoManager: VideoManager): boolean => {
    tick(100);
    videoManager.isLoading().subscribe((loading: boolean) => {
        isLoading = loading;
    })
    return isLoading;
}

export const after1second = () => {
    tick(1000);
    flush();
}

export const withFakeListAsInitialState = async (videoDataSource: jasmine.SpyObj<VideoDataSource>, videoManager: VideoManager) => {
    videoDataSource.getVideoList.and.returnValue(new Promise((complete) => complete(fakeVideoMetaDataList)));
    await videoManager.queryVideoList();
}
