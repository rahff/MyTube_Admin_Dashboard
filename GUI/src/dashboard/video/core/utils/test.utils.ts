import { fakeVideoMetaDataList, newVideoMetaData } from "src/data/video.data";
import { VideoDataSource } from "../ports/driven/VideoDataSource";
import { tick, flush } from "@angular/core/testing";
import { VideoManager } from "../use-cases/VideoManager";
import { UnknowException } from "src/shared/Exception";


export const dataSourceWillReturnAfter1Second = (videoDataSource: any, methodName: string, value: any) => {
    videoDataSource[methodName].and.returnValue(new Promise((complete) => { 
        setTimeout(() => {
            complete(value);
        }, 1000);
    }));
}



export const dataSourceWillFailAfter1Second = (videoDataSource: any, methodName: string, error: any) => {
    videoDataSource[methodName].and
    .returnValue(new Promise((_, reject) => {
        setTimeout(() => {
            reject(error);
        }, 1000);
    }));
}

export const verifyIsLoadindWhileprocessing = (isLoading: boolean, asyncTaskProcessor: any): boolean => {
    tick(100);
    asyncTaskProcessor.isLoading().subscribe((loading: boolean) => {
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
