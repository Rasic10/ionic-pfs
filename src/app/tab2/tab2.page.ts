import { Component, OnInit } from '@angular/core';
import { AzureBlobStorageService } from '../services/azure-blob-storage.servces';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  sas = "sp=racwdl&st=2021-05-09T20:06:29Z&se=2021-09-30T04:06:29Z&spr=https&sv=2020-02-10&sr=c&sig=K37uymiq8gTtGo6odBBmy%2FtS8N14KCKasbYVIwoxqzQ%3D";

  picturesList: string[] = [];
  picturesDownloaded: string[] = []

  videosList: string[] = [];
  videoDownloaded;

  setEventForAddFiles: any;

  constructor(private blobService: AzureBlobStorageService) {

  }

  ngOnInit(): void {
    this.reloadImages();

    
  }

  public setSas(event) {
    this.sas = event.target.value;
  }

  filesSelected(event: Event) {
    this.setEventForAddFiles = event;
  }

  public imageSelected() {
    var file = (this.setEventForAddFiles as HTMLInputEvent).target.files[0];

    this.blobService.uploadImage(this.sas, file, file.name, () => {
      this.reloadImages()
    })
  }

  public deleteImage (name: string) {
    this.blobService.deleteImage(this.sas, name, () => {
      this.reloadImages()
    })
  }

  public downloadImage (name: string) {
    this.blobService.downloadImage(this.sas, name, blob => {
      let url = window.URL.createObjectURL(blob);
      window.open(url);
    })
  }

  private reloadImages() {
    this.blobService.listImages(this.sas).then(list => {
      this.picturesList = list
      const array = []
      this.picturesDownloaded = array

      for (let name of this.picturesList) {
        this.blobService.downloadImage(this.sas, name, blob => {
          var reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = function () {
            array.push(reader.result as string)
          }
        })
      }
    })
  }
}
