import { Component, OnInit } from '@angular/core';
import { TranslatingService } from '../translating/translating.service';

@Component({
  selector: 'app-dictionary-field',
  templateUrl: './dictionary-field.component.html',
  styleUrls: ['./dictionary-field.component.scss']
})
export class DictionaryFieldComponent implements OnInit {

  constructor(private _translatingService : TranslatingService) {  }
  
  public synonyms = ["first", "second", "third", "fourth"]

  translateWord(inputWord : string) {
    // alert("translate " + inputWord)
    this._translatingService.getTranslation(inputWord)

    // this.synonyms = this._translatingService.getTranslation(inputWord)
  }

  ngOnInit(): void {
    
  }

}
