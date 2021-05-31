import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

class Photo {
    name: string;
    fileSize: string;
    resolution: string;
    dateCreated: Date;
    link: string;
    clubId: string;
  }

@Injectable({
    providedIn: 'root'
})
export class AwsStorageService {

    constructor(private http: HttpClient) {}

    public uploadImage(file : File){
        let formData = new FormData();
        formData.append('file', file);
        // let request = new XMLHttpRequest();
        // request.open("POST", "https://localhost:5001/aws/upload");
        // request.send(formData);
        // return this.http.post("https://localhost:5001/aws/upload", file);
        return this.http.post("https://localhost:5001/aws/upload", formData);
    }

    public getImages() {
        return this.http.get<Photo[]>("https://localhost:5001/aws/get");
    }

    public deleteImage(photo : Photo) {
        return this.http.post("https://localhost:5001/aws/delete", photo);
    }
}