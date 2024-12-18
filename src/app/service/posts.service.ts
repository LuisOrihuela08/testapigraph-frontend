import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private apiUrl = 'http://localhost:8080/api/post';

  constructor(private http: HttpClient) { }

  getpost(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl + '/list');
  }

  createpost(postData: FormData): Observable<any> {
    return this.http.post(this.apiUrl + '/create', postData);
  } 

}
