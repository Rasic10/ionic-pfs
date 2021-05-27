import { Component } from '@angular/core';
import { AwsStorageService } from 'src/app/services/aws-storage.services';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

class Photo {
  name: string;
  fileSize: string;
  resolution: string;
  dateCreated: Date;
  link: string;
  clubId: string;
}

@Component({
  selector: 'app-aws3-storage',
  templateUrl: 'aws3-storage.page.html',
  styleUrls: ['aws3-storage.page.scss']
})
export class AWS3StoragePage {

  picturesList: Photo[] = [];

  setEventForAddFiles: any;
  constructor(private awsService: AwsStorageService) {}

  ngOnInit(): void {
    this.reloadImages();
  }

  filesSelected(event: Event) {
    this.setEventForAddFiles = event;
  }

  imageSelected() {
    var file = (this.setEventForAddFiles as HTMLInputEvent).target.files[0];

    console.log('file ', file);
    this.awsService.uploadImage(file);
    this.reloadImages();
  }

  deleteImage(photo : Photo) {
    this.awsService.deleteImage(photo).subscribe(() =>  this.reloadImages());
  }

  private reloadImages() {
    this.awsService.getImages().subscribe(list => {
      console.log(list)
      this.picturesList = list;
    })
  }
}
