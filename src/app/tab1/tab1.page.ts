import { Component } from '@angular/core';
import { Plugins, CameraResultType, FilesystemDirectory, Capacitor, CameraSource, CameraPhoto }  from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AzureBlobStorageService } from '../services/azure-blob-storage.servces';

const { Camera, Filesystem, Storage } = Plugins;

export interface Photo {
  filepath: string;
  webviewPath: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  photo: SafeResourceUrl;
  sas = "sp=racwdl&st=2021-05-09T20:06:29Z&se=2021-09-30T04:06:29Z&spr=https&sv=2020-02-10&sr=c&sig=K37uymiq8gTtGo6odBBmy%2FtS8N14KCKasbYVIwoxqzQ%3D";
  photos: Photo[] = [];
  PHOTO_STORAGE: string = "photos";

  constructor(private sanitizer: DomSanitizer,
              private blobService: AzureBlobStorageService) {}

  public async takePicture() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, 
      source: CameraSource.Camera, 
      quality: 100,
    });

    const savedImageFile = await this.savePicture(capturedPhoto);
    this.photos.unshift(savedImageFile);
  }

  private async savePicture(cameraPhoto: CameraPhoto) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(cameraPhoto);
  
    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Documents
    });
  
    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: fileName,
      webviewPath: cameraPhoto.webPath
    };
  }

  private async readAsBase64(cameraPhoto: CameraPhoto) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(cameraPhoto.webPath!);
    const blob = await response.blob();

    const fileName = new Date().getTime() + '.' + cameraPhoto.format;

    this.blobService.uploadImage(this.sas, blob, fileName, () => {
      console.log("upload image corectly");
    })
  
    return await this.convertBlobToBase64(blob) as string;  
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}
