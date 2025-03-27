import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  favoriteAlbums: any[] = [];

  constructor(private router: Router) {}


  loadFavorites() {
    const storedFavorites = localStorage.getItem('favorites');
    this.favoriteAlbums = storedFavorites ? JSON.parse(storedFavorites) : [];
  }
  

  ngOnInit() {
    this.loadFavorites();
  }
  

  removeFromFavorites(albumId: number) {
    this.favoriteAlbums = this.favoriteAlbums.filter(album => album.id !== albumId);
    localStorage.setItem('favorites', JSON.stringify(this.favoriteAlbums));
  }
  
  

  goToAlbum(albumId: number) {
    this.router.navigate(['/albums', albumId]);
  }
  home(){
    this.router.navigate(['/home']);
  }
}
