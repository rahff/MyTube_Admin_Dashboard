import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoListComponent } from './views/video-list/video-list.component';
import { VideoStatsComponent } from './views/video-stats/video-stats.component';
import { VideoCardComponent } from './views/components/video-card/video-card.component';



@NgModule({
  declarations: [
    VideoListComponent,
    VideoStatsComponent,
    VideoCardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class VideoModule { }
