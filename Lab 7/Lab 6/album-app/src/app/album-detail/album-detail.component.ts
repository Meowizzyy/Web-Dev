import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent {
  album: any;
  isFavorite = false;
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private location = inject(Location);
  private router = inject(Router);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get(`https://jsonplaceholder.typicode.com/albums/${id}`)
      .subscribe(data => {
        this.album = data;
        this.checkFavorite();
      });
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
      favorites = favorites.filter((fav: any) => fav.id !== this.album.id);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    this.isFavorite = !this.isFavorite;
  }

  checkFavorite() {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    this.isFavorite = favorites.some((fav: any) => fav.id === this.album.id);
  }
}
