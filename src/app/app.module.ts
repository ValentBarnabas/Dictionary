import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DictionaryFieldComponent } from './dictionary-field/dictionary-field.component';
import { TranslatingService } from './translating/translating.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    DictionaryFieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule

    ,MatButtonModule
    ,MatInputModule
    ,MatCardModule
  ],
  providers: [TranslatingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
