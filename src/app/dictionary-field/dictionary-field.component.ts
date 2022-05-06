import { Component, OnInit } from '@angular/core';
import { LanguagePair } from '../languagePair';
import { TranslatingService } from '../translating/translating.service';
import { Translation } from '../translation';

@Component({
  selector: 'app-dictionary-field',
  templateUrl: './dictionary-field.component.html',
  styleUrls: ['./dictionary-field.component.scss']
})
export class DictionaryFieldComponent implements OnInit {
  
  public translations : Translation[] = []
  public languages : LanguagePair[] = []

  public fromLanguageOptions : string[] = ["..."]
  public toLanguageOptions : string[] = ["..."]

  public currFrom: string = ""
  public currTo: string = ""

  constructor(private _translatingService : TranslatingService) {  }

  translateWord(inputWord : string) {
    if (inputWord === '') {
      alert("Type in word to be translated")
      return;
    }
    this._translatingService.getTranslation(inputWord, this.currFrom, this.currTo)
      .subscribe(data => {
        console.log(data.def)
        if (data.def.length === 0) {
          alert("Word does not exist, check for typo")
        } else {
          this.translations = []
          for (let i in data.def) {
            for (let j in data.def[i].tr) {
              let currTrans = new Translation(data.def[i].tr[j].text, data.def[i].tr[j].pos)
              for (let k in data.def[i].tr[j].mean) {
                console.log(data.def[i].tr[j].text + " " + data.def[i].tr[j].pos + " " + data.def[i].tr[j].mean[k].text)
                currTrans.addMeaning(data.def[i].tr[j].mean[k].text)
              }
              this.translations.push(currTrans)
            }
          }
        }
      })
  }

  onFromChanged(selected: string) {
    this.currFrom = selected
    this.toLanguageOptions = []
    for (let i in this.languages) {
      if (this.languages[i].from.toUpperCase() == this.currFrom.toUpperCase()) {
        this.toLanguageOptions.push(this.languages[i].to)
      }
    }
    this.currTo = this.toLanguageOptions[0]
    //TODO: update displayed value in #to
  }

  onToChanged(selected: string) {
    this.currTo = selected
  }

  ngOnInit(): void {
    this._translatingService.getLanguages()
      .subscribe( data => {
        for(let i in data) {
          let splitted = data[i].split('-')
          this.languages.push(new LanguagePair(splitted[0], splitted[1]))
        }
        this.fromLanguageOptions = []
        this.toLanguageOptions = []
        for (let i in this.languages) {
          if (!this.fromLanguageOptions.includes(this.languages[i].from)) {
            this.fromLanguageOptions.push(this.languages[i].from)
          }
        }
        this.currFrom = this.fromLanguageOptions[0]
        this.onFromChanged(this.currFrom)
      })
  }
}

//TODO: fix visuals of selected item, shows incorrect to when from is changed