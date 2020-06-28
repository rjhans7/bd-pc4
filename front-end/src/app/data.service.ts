import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/** Service that makes the request to the server */
export class DataService {

  /** Back-end path */
  static path = environment.APIEndpoint;

/** Constructor
 * @param http httpClient variable to make request s
 */
  constructor(private http: HttpClient) { }

  /** Funcion addFile
   * Upload the images to the server
   * @param file file to be uploaded
   * @return Observer of the given API request
  */
  addFile(file: any): Observable<any>{
    /** FormData */
    const formData = new FormData();
    /** Add the file to the form data */
    formData.append('file', file[0]);
    /** Post request */
    return this.http.post<any>(DataService.path + '/upload', formData)
  }

    /** Funcion addFile
   * Upload the images to the server
   * @param file file to be uploaded
   * @return Observer of the given API request
  */
  addFiles(files: any): Observable<any>{
    /** FormData */
    const formData = new FormData();
    /** Add the file to the form data */
    for (let i = 0; i < files.length; i++){
      formData.append('files[]', files[i], files[i]['name']);
    }
    /** Post request */
    return this.http.post<any>(DataService.path + '/upload/all', formData)
  }

}
