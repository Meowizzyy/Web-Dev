import { BrowserModule } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { routes } from './app.routes';

export const appConfig = {
  providers: [
    importProvidersFrom(BrowserModule, HttpClientModule, FormsModule),
    provideRouter(routes)
  ]
};
