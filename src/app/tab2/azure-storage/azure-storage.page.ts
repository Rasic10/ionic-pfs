import { Component, OnInit } from '@angular/core';
import { PhotosService } from 'src/app/services/photos.services';
import { AzureBlobStorageService } from '../../services/azure-blob-storage.servces';

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
  selector: 'app-azure-storage',
  templateUrl: 'azure-storage.page.html',
  styleUrls: ['azure-storage.page.scss']
})
export class AzureStoragePage implements OnInit {

  sas = "sp=racwdl&st=2021-05-09T20:06:29Z&se=2021-09-30T04:06:29Z&spr=https&sv=2020-02-10&sr=c&sig=K37uymiq8gTtGo6odBBmy%2FtS8N14KCKasbYVIwoxqzQ%3D";

  picturesList: string[] = [];
  picturesDownloaded: string[] = []
  searchImageInput: string;
  searchImage;
  searchSpinner = false;

  videosList: string[] = [];
  videoDownloaded;
  photo: Photo = new Photo();

  setEventForAddFiles: any;

  constructor(private blobService: AzureBlobStorageService, private _photosService: PhotosService) {}

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
    
    // this.photo = new Photo()
    this.photo.clubId = "b529031a-69eb-4684-af54-fa9e425e45a1";
    this.photo.dateCreated = new Date();
    this.photo.fileSize = "256kb";
    this.photo.name = "slika 2";
    this.photo.resolution = "15x15";
    this.photo.link = "link";
     
    this._photosService.postPhoto(this.photo).subscribe(res => {
      console.log(res);
    })

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
      this.picturesList = list;
      const array = [];
      this.picturesDownloaded = array;

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

  searchImages() {
    this.searchSpinner = true;
    if (!this.searchImageInput) {
      return;
    }

    const array = [];
    this.searchImage = array;

    this.blobService.downloadImage(this.sas, this.searchImageInput, blob => {
      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        array.push(reader.result as string);
      }

      this.searchSpinner = false;
    })

    
  }
}
