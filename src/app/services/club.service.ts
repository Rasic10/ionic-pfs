import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Club } from "../tab1/tab1.page";

@Injectable({
    providedIn: 'root'
})
export class ClubsService {

    constructor(private http: HttpClient) {}

    getClubById(clubId: string) {
        return this.http.get<Club>(`https://localhost:5001/api/Clubs/${clubId}`);
    }   
}