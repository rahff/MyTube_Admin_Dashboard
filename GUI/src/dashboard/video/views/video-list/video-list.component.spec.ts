import { fakeVideoMetaDataList } from 'src/data/video.data';
import { VideoMetaData } from '../../core/ports/dtos/VideoMetaData';
import { VideoListComponent } from './video-list.component';
import { VideoManager } from '../../core/use-cases/VideoManager';
import { of } from 'rxjs';



describe('VideoListComponent', () => {
  let component: VideoListComponent;
  let videoManager: jasmine.SpyObj<VideoManager>;

  beforeEach(() => {
    videoManager = jasmine.createSpyObj("Videomanager", ["getVideoList", "queryVideoList"])
    component = new VideoListComponent(videoManager);
    videoManager.getVideoList.and.returnValue(of(fakeVideoMetaDataList))
    component.ngOnInit();
  });

  it("should display channel's video as list of video card", () => {
    component.getVideoList().subscribe((videoList: VideoMetaData[])=> {
      expect(videoList).toEqual(fakeVideoMetaDataList);
      expect(videoManager.queryVideoList).toHaveBeenCalled();
    })
  });
});
