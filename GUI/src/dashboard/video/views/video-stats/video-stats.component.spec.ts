import { fakeVideoStatistics } from 'src/data/statistics.data';
import { VideoStats } from '../../core/ports/dtos/VideoStatistics';
import { VideoStatsComponent } from './video-stats.component';
import { VideoStatistics } from '../../core/use-cases/VideoStatistics';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FakeActivatedRoute } from '../../core/utils/FakeActivatedRoute';



describe('VideoStatsComponent', () => {
  let component: VideoStatsComponent;
  let videoStatsService: jasmine.SpyObj<VideoStatistics>;
  let activatedRoute: ActivatedRoute;
  
  beforeEach(() => {
    activatedRoute = new FakeActivatedRoute();
    videoStatsService = jasmine.createSpyObj("VideoStatistics", ["queryStatistics", "getVideoStatistics", "isLoading"]);
    component = new VideoStatsComponent(videoStatsService, activatedRoute);
    videoStatsService.getVideoStatistics.and.returnValue(of(fakeVideoStatistics));
    component.ngOnInit();
  });

  it('should display stats for a given video', () => {
    component.getStats().subscribe((stats: VideoStats) => {
      expect(stats).toEqual(fakeVideoStatistics);
      expect(videoStatsService.queryStatistics)
      .toHaveBeenCalledWith(FakeActivatedRoute.paramValue);
    });
  });
});
