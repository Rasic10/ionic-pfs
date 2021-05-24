import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface Photo {
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
export class PhotosService {

    constructor(private http: HttpClient) {}

    postPhoto(photo: Photo) {
        return this.http.post<Photo>("https://localhost:5001/api/Storage", photo);
    }   
}