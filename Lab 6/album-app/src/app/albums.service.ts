import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Album {
  userId: number;
  id?: number;
  title: string;
}

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  private albumsUrl = 'https://jsonplaceholder.typicode.com/albums';
  private photosUrl = 'https://jsonplaceholder.typicode.com/photos';

  constructor(private http: HttpClient) { }

  
  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.albumsUrl);
  }

  getAlbum(id: number): Observable<Album> {
    return this.http.get<Album>(`${this.albumsUrl}/${id}`);
  }


  createAlbum(album: Album): Observable<Album> {
    return this.http.post<Album>(this.albumsUrl, album);
  }


  updateAlbum(album: Album): Observable<Album> {
    return this.http.put<Album>(`${this.albumsUrl}/${album.id}`, album);
  }

  deleteAlbum(id: number): Observable<any> {
    return this.http.delete(`${this.albumsUrl}/${id}`);
  }

  getPhotos(albumId: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.photosUrl}?albumId=${albumId}`).pipe(
      map(photos => photos.map(photo => {
        return {
          ...photo,
          thumbnailUrl: `https://picsum.photos/150?random=${photo.id}`
        };
      }))
    );
  }
  
}
