import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class PackService {

    packs;

    constructor(private httpClient: HttpClient) { }

    async getPacks() {
        return this.httpClient.get(`${environment.apiUrl}/packs`).toPromise();
    }

}