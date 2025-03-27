import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Album } from '../albums.service';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent {
  album: Album | null = null;
  newTitle: string = '';
  isEditing: boolean = false;
  isFavorite = false;

  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private location = inject(Location);
  private router = inject(Router);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const albumFromState = history.state.album;
    if (albumFromState) {
      this.album = albumFromState;
      if (this.album) {
        this.newTitle = this.album.title;
      }
      
      this.checkFavorite();
    } else {
      const localAlbums = JSON.parse(localStorage.getItem('localAlbums') || '[]');
      const localAlbum = localAlbums.find((a: Album) => a.id === id);
      if (localAlbum) {
        this.album = localAlbum;
        this.newTitle = localAlbum.title;
      } else {
        this.http.get<Album>(`https://jsonplaceholder.typicode.com/albums/${id}`)
          .subscribe(
            data => {
              this.album = data;
              this.newTitle = data.title;
              this.checkFavorite();
            },
            error => console.error('Ошибка получения альбома', error)
          );
      }
    }
  }

  return() {
    this.router.navigate(['/albums']);
  }

  goToPhotos() {
    if (this.album) {
      this.router.navigate(['/albums', this.album.id, 'photos']);
    }
  }

  addToFavorites() {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!this.isFavorite) {
      favorites.push(this.album);
    } else {
      favorites = favorites.filter((fav: any) => Number(fav.id) !== Number(this.album?.id));
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    this.isFavorite = !this.isFavorite;
  }

  checkFavorite() {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    this.isFavorite = favorites.some((fav: any) => Number(fav.id) === Number(this.album?.id));
  }

  saveTitle(): void {
    if (!this.album) return; 
  
    
    this.album.title = this.newTitle;
    this.isEditing = false;
  
    
    if ((this.album.id ?? 0) > 100) {
      const localAlbums = JSON.parse(localStorage.getItem('localAlbums') || '[]');
      const index = localAlbums.findIndex((a: any) => a.id === this.album!.id);
      if (index !== -1) {
        localAlbums[index].title = this.album.title;
        localStorage.setItem('localAlbums', JSON.stringify(localAlbums));
      }
    } else {
      this.http.put<Album>(`https://jsonplaceholder.typicode.com/albums/${this.album.id}`, this.album)
        .subscribe(data => {
          console.log('Альбом обновлен на сервере', data);
        });
    }
  }
  
}
