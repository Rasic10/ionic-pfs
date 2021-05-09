import { Component } from '@angular/core';
import { Plugins, CameraResultType, CameraSource }  from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AzureBlobStorageService } from '../services/azure-blob-storage.servces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  photo: SafeResourceUrl;
  sas = "sp=racwdl&st=2021-05-09T20:06:29Z&se=2021-09-30T04:06:29Z&spr=https&sv=2020-02-10&sr=c&sig=K37uymiq8gTtGo6odBBmy%2FtS8N14KCKasbYVIwoxqzQ%3D";

  constructor(private sanitizer: DomSanitizer,
              private blobService: AzureBlobStorageService) {}

  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    // var imageFile = image as unknown as File;

    // this.blobService.uploadImage(this.sas, imageFile, imageFile.name, () => {
    //   alert("Add images");
    // })

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }
}
