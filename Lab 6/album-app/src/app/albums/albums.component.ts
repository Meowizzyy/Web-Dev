import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // импортируем CommonModule
import { AlbumsService, Album } from '../albums.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-albums',
  standalone: true,  // если используете standalone компоненты
  imports: [CommonModule],
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent {
  albums: Album[] = [];
  constructor(private albumsService: AlbumsService, private router: Router) {}

  ngOnInit(): void {
    this.albumsService.getAlbums().subscribe(data => this.albums = data);
  }

  deleteAlbum(id: number): void {
    this.albumsService.deleteAlbum(id).subscribe(() => {
      this.albums = this.albums.filter(album => album.id !== id);
    });
  }

  goToDetail(id: number): void {
    this.router.navigate(['/albums', id]);
  }
  home(){
    this.router.navigate(['/home']);
  }
  favorites(){
    this.router.navigate(['/favorites']);
  }
}
