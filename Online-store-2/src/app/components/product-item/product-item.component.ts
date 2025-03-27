import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-item',
  standalone: true,
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product;
  @Output() removeProduct = new EventEmitter<Product>();

  

  savelike(){
    const likeData = JSON.parse(localStorage.getItem('likes') || '{}');
    likeData[this.product.id] = this.product.likes;
    localStorage.setItem('likes',JSON.stringify(likeData));
  }
  loadlike(){
    const likeData = JSON.parse(localStorage.getItem('likes') || '{}');
    if(likeData[this.product.id] !== undefined){
      this.product.likes = likeData[this.product.id];
    }
  }
  likeProduct() {
    if(this.product.likes == 0){
      this.product.likes++;
      this.savelike();
    }
    
  }
  ngOnInit() {
    this.loadlike();
  }

  remove() {
    this.removeProduct.emit(this.product);
  }

  nextImage() {
    if (this.product.currentImageIndex < this.product.images.length - 1) {
      this.product.currentImageIndex++; 
    } else {
      this.product.currentImageIndex = 0; 
    }
  }

  prevImage() {
    if (this.product.currentImageIndex > 0) {
      this.product.currentImageIndex--; 
    } else {
      this.product.currentImageIndex = this.product.images.length - 1; 
    }
  }
  openWhatsApp() {
    const phoneNumber = '1234567890'; 
    const url = `https://wa.me/${phoneNumber}`;
    window.open(url, '_blank'); 
  }
  
  openTelegram() {
    const username = 'username';
    const url = `https://t.me/${username}`;
    window.open(url, '_blank'); 
  }

  
}

