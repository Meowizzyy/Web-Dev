// albums.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlbumsService, Album } from '../albums.service';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent {
  albums: Album[] = [];
  newAlbumTitle: string = '';
  private albumsService = inject(AlbumsService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadAlbums();
  }

  loadAlbums(): void {
    this.albumsService.getAlbums().subscribe(data => {
      const localAlbums = JSON.parse(localStorage.getItem('localAlbums') || '[]');
      this.albums = [...data, ...localAlbums];
    });
  }

  deleteAlbum(albumId: number | undefined): void {
    if (albumId === undefined) return; 
    this.albums = this.albums.filter(album => album.id !== albumId);
    this.updateLocalStorage();
}


goToDetail(album: Album): void {
  this.router.navigate(['/albums', album.id], { state: { album } });
}

  createAlbum(): void {
    if (!this.newAlbumTitle.trim()) {
      return;
    }

    const newId = this.albums
    .map(album => album.id ?? 0) 
    .reduce((max, id) => Math.max(max, id), 0) + 1;


    

    const newAlbum: Album = {
      id: newId,
      userId: 1, 
      title: this.newAlbumTitle.trim()
    };

    
    const localAlbums = JSON.parse(localStorage.getItem('localAlbums') || '[]');
    localAlbums.push(newAlbum);
    localStorage.setItem('localAlbums', JSON.stringify(localAlbums));

    this.albums.push(newAlbum);
    this.newAlbumTitle = '';
  }
  favorites(): void {
    this.router.navigate(['/favorites']);
  }
  home():void{
    this.router.navigate(['/home']);
  }
  

  private updateLocalStorage(): void {
    localStorage.setItem(
        'localAlbums',
        JSON.stringify(this.albums.filter(a => (a.id ?? 0) > 100)) 
    );
}

}
