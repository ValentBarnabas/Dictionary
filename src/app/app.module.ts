import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DictionaryFieldComponent } from './dictionary-field/dictionary-field.component';
import { TranslatingService } from './translating/translating.service';

@NgModule({
  declarations: [
    AppComponent,
    DictionaryFieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [TranslatingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
