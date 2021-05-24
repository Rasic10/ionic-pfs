import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AwsStorageService {

    public uploadImage(file : File){
        let formData = new FormData();
        formData.append('file', file);
        let request = new XMLHttpRequest();
        request.open("POST", "https://localhost:44305/upload");
        request.send(formData);
    }
}