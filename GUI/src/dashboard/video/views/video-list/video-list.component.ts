import { Component, OnInit } from '@angular/core';
import { VideoManager } from '../../core/use-cases/VideoManager';
import { Observable } from 'rxjs';
import { VideoMetaData } from '../../core/ports/dtos/VideoMetaData';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {

  private videoList$: Observable<VideoMetaData[]> = new Observable();

  public constructor(private videoManager: VideoManager){}

  public ngOnInit(): void {
    this.videoManager.queryVideoList();
    this.videoList$ = this.videoManager.getVideoList();
  }

  public getVideoList(): Observable<VideoMetaData[]> {
    return this.videoList$;
  }

}
