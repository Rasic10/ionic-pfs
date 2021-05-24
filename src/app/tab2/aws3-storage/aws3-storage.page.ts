import { Component } from '@angular/core';
import { AwsStorageService } from 'src/app/services/aws-storage.services';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-aws3-storage',
  templateUrl: 'aws3-storage.page.html',
  styleUrls: ['aws3-storage.page.scss']
})
export class AWS3StoragePage {

  setEventForAddFiles: any;
  constructor(private awsService: AwsStorageService) {}

  ngOnInit(): void {
  }

  filesSelected(event: Event) {
    this.setEventForAddFiles = event;
  }

  imageSelected() {
    var file = (this.setEventForAddFiles as HTMLInputEvent).target.files[0];

    this.awsService.uploadImage(file);
  }

}
