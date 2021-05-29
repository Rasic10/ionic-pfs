import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

@Injectable({
    providedIn: 'root'
})
export class AzureBlobStorageService {

    picturesAccount = "ngblobs";
    picturesContainer = "pictures";

    constructor(private http: HttpClient) {

    }

    public uploadImage(sas: string, content: Blob, name: string, handler: () => void) {
        this.uploadBlob(content, name, this.containerClient(sas), handler)
    }

    public listImages(sas: string): Promise<string[]> {
        return this.listBlobs(this.containerClient(sas))
    }

    public downloadImage(sas: string, name: string, handler: (blob: Blob) => void) {
        this.downloadBlob(name, this.containerClient(sas), handler)
    }

    public deleteImage(sas: string, name: string, handler: () => void) {
        this.deleteBlob(name, this.containerClient(sas), handler);
        return this.http.delete(`https://localhost:5001/api/Storage/${name}`);
    }
    
    // -IMAGES

    private uploadBlob(content: Blob, name: string, client: ContainerClient, handler: () => void) {
        let blockBlobClient = client.getBlockBlobClient(name);
        blockBlobClient.uploadData(content, { blobHTTPHeaders: { blobContentType: content.type } })
            .then(() => handler())
    }

    private async listBlobs(client: ContainerClient): Promise<string[]> {
        let result: string[] = []
        let blobs = client.listBlobsFlat();
        
        for await (const blob of blobs) {
            result.push(blob.name)
        }

        return result;
    }

    private downloadBlob(name: string, client: ContainerClient, handler: (blob: Blob) => void) {
        const blobClient = client.getBlobClient(name);
        blobClient.download().then(resp => {
            resp.blobBody.then(blob => {
            handler(blob)
            })
        }).catch(err => {
            return "Error";
        })
    }

    private deleteBlob(name: string, client: ContainerClient, handler: () => void) {
        client.deleteBlob(name).then(() => {
            handler()
        })
    }

    private containerClient(sas: string): ContainerClient {
        return new BlobServiceClient(`https://${this.picturesAccount}.blob.core.windows.net?${sas}`)
                .getContainerClient(this.picturesContainer);
    }
}