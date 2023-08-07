import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './core/home/home.component';
import { InfoComponent } from './core/info/info.component';
import { ReceivedMariosComponent } from './core/received-marios/received-marios.component';
import { SentMariosComponent } from './core/sent-marios/sent-marios.component';
import { InfoMariosComponent } from './core/info-marios/info-marios.component';
import { HeaderComponent } from './shared/header/header.component';
import {HttpClientModule} from "@angular/common/http";
import {NgOptimizedImage} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatChipsModule} from '@angular/material/chips';
import {AddMariosComponent} from "./core/add-marios/add-marios.component";
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InfoComponent,
    ReceivedMariosComponent,
    SentMariosComponent,
    InfoMariosComponent,
    HeaderComponent,
    AddMariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgOptimizedImage,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
