import { Component, Input } from '@angular/core';
import { Product } from '../product/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true, 
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;

  changeImage(direction: number) {
    if (!this.product || !this.product.images) return;

    const totalImages = this.product.images.length;
    this.product.currentImageIndex = (this.product.currentImageIndex! + direction + totalImages) % totalImages;
  }

  goToStore() {
    window.open(this.product.url, '_blank'); 
  }

  share(platform: string) {
    const message = `Смотри, крутой товар: ${this.product.name} - ${this.product.url}`;
    let shareUrl = '';

    if (platform === 'whatsapp') {
      shareUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    } else if (platform === 'telegram') {
      shareUrl = `https://t.me/share/url?url=${encodeURIComponent(this.product.url)}&text=${encodeURIComponent(this.product.name)}`;
    }

    window.open(shareUrl, '_blank');
  }
}
