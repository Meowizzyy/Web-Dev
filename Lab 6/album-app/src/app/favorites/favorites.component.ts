import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  favoriteAlbums: any[] = [];
  private router = inject(Router);

  ngOnInit() {
    this.favoriteAlbums = JSON.parse(localStorage.getItem('favorites') || '[]');
  }
  home(){
    this.router.navigate(['/home'])
  }
}
