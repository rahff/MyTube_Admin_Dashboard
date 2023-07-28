import { Component, Input } from '@angular/core';
import { VideoMetaData } from 'src/dashboard/video/core/ports/dtos/VideoMetaData';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css']
})
export class VideoCardComponent {

  @Input() public video!: VideoMetaData
}
