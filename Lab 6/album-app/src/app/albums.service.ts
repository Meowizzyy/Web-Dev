import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Album {
  userId: number;
  id: number;
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

  // Получить все альбомы
  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.albumsUrl);
  }

  // Получить альбом по id
  getAlbum(id: number): Observable<Album> {
    return this.http.get<Album>(`${this.albumsUrl}/${id}`);
  }

  // Создать новый альбом
  createAlbum(album: Album): Observable<Album> {
    return this.http.post<Album>(this.albumsUrl, album);
  }

  // Обновить альбом
  updateAlbum(album: Album): Observable<Album> {
    return this.http.put<Album>(`${this.albumsUrl}/${album.id}`, album);
  }

  // Удалить альбом
  deleteAlbum(id: number): Observable<any> {
    return this.http.delete(`${this.albumsUrl}/${id}`);
  }

  // Получить фотографии для альбома по albumId
  getPhotos(albumId: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.photosUrl}?albumId=${albumId}`).pipe(
      map(photos => photos.map(photo => {
        return {
          ...photo,
          // Используем picsum.photos на 150px (или другой размер на ваше усмотрение).
          // Параметр random нужен, чтобы при каждом ID была своя картинка.
          thumbnailUrl: `https://picsum.photos/150?random=${photo.id}`
        };
      }))
    );
  }
  
}
