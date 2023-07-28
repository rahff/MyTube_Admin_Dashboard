import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { VideoStats } from '../../core/ports/dtos/VideoStatistics';
import { VideoStatistics } from '../../core/use-cases/VideoStatistics';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IllegalStateException } from 'src/shared/Exception';

@Component({
  selector: 'app-video-stats',
  templateUrl: './video-stats.component.html',
  styleUrls: ['./video-stats.component.css']
})
export class VideoStatsComponent implements OnInit, OnDestroy {

  private videoStats$: Observable<VideoStats> = new Observable();
  private isLoading$: Observable<boolean> = new Observable();
  private subscription!: Subscription;
  public constructor(private videoStatsService: VideoStatistics,
                     private activatedRoute: ActivatedRoute){}

  public ngOnInit(): void {
    this.subscription = this.activatedRoute.paramMap
    .subscribe({next: this.queryStats.bind(this)});
  }

  private queryStats(param: ParamMap): void {
    const videoId = this.ensureId(param.get("id"))
    this.videoStatsService.queryStatistics(videoId);
    this.addStateListener();
  }

  private addStateListener(): void {
    this.videoStats$ = this.videoStatsService.getVideoStatistics();
    this.isLoading$ = this.videoStatsService.isLoading();
  }

  private ensureId(param: string | null): string {
    if(!param) throw new IllegalStateException("there is no video identifier");
    return param;
  }

  public getStats(): Observable<VideoStats> {
    return this.videoStats$;
  }

  public isLoading(): Observable<boolean> {
    return this.isLoading$;
  }

  public ngOnDestroy(): void {
     this.subscription.unsubscribe(); 
  }
}
