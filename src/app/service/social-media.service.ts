import { HttpClient, HttpParams, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Facebook } from '../models/facebook';
import { Instagram } from '../models/instagram';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {

  private apiUrl = 'http://localhost:8080/api/social-media';

  constructor(private http: HttpClient) { }

  
  postFacebook(post: Facebook): Observable<any> {
    const params = new HttpParams()
      .set('message', post.message || '') // Establecer el mensaje
      .set('url', post.url || ''); // Establecer la URL de la imagen

    // Enviar los parámetros como parte de la URL
    return this.http.post<any>(`${this.apiUrl}/publicar/facebook`, null, { params });
  }
    
  postInstagram(post: Instagram): Observable<any>{
    const params = new HttpParams()
    .set('caption', post.caption || '')
    .set('image_url', post.image_url || '');

    return this.http.post<any>(`${this.apiUrl}/publicar/instagram`, null, { params });
  }
}

