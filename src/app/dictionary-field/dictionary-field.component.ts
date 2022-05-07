import { Component, OnInit } from '@angular/core';
import { LanguagePair } from '../languagePair';
import { TranslatingService } from '../translating/translating.service';
import { Translation } from '../translation';

/**
 * Main view of Dictionary application, contains all the required parts.
 */
@Component({
  selector: 'app-dictionary-field',
  templateUrl: './dictionary-field.component.html',
  styleUrls: ['./dictionary-field.component.scss']
})
export class DictionaryFieldComponent implements OnInit {
  
  public translations : Translation[] = []
  public languagePairs : LanguagePair[] = []

  public fromLanguageOptions : string[] = ["..."]
  public toLanguageOptions : string[] = ["..."]

  public currFrom: string = ""
  public currTo: string = ""

  constructor(private _translatingService : TranslatingService) {  }

  /**
   * Calls TranslatingService.getTranslation(...) with the currently set values
   * input word is given to it
   * from and to language are stored and thus no need to give them in the call
   * After the async function is over, processes returned data with processTranslation(...)
   * If there is an error in the http communication, alerts the user
   * 
   * @param inputWord   the word to be translated
   * @returns           none
   */
  translateWord(inputWord : string) {
    if (inputWord === '') {
      alert("Type in word to be translated")
      return;
    }
    this._translatingService.getTranslation(inputWord, this.currFrom, this.currTo)
      .subscribe( data => this.processTranslation(data),
                  error => alert("Server error: " + error))
  }

  /**
   * Processes data returned from TranslatingService.getTranslation(...).
   * Empties current translations, then iterates through the returned data,
   * creates Translations objects and appends them to the translations list. 
   * If returned data is empty, the service didnt find any matching words, 
   * the user is alerted about the problem.
   * 
   * 
   * @param data    Custom foreign JSON object, return value from TranslatingService.getTranslation(...)
   */
  processTranslation(data: any) {
    if (data.def.length === 0) {
      alert("Word does not exist, check for typo")
    } else {
      this.translations = []
      for (let i in data.def) {
        for (let j in data.def[i].tr) {
          let currTrans = new Translation(data.def[i].tr[j].text, data.def[i].tr[j].pos)
          for (let k in data.def[i].tr[j].mean) {
            currTrans.addMeaning(data.def[i].tr[j].mean[k].text)
          }
          this.translations.push(currTrans)
        }
      }
    }
  }

  /**
   * Is called when the "from language" value is changed.
   * Saves the new value and creates a new "to languages" list
   * using languagePairs. Also sets new "to" language.
   * 
   * @param selected  ISO code of selected country
   */
  onFromChanged(selected: string) {
    this.currFrom = selected
    this.toLanguageOptions = []
    for (let i in this.languagePairs) {
      if (this.languagePairs[i].from.toUpperCase() == this.currFrom.toUpperCase()) {
        this.toLanguageOptions.push(this.languagePairs[i].to)
      }
    }
    this.currTo = this.toLanguageOptions[0]
  }

  /**
   * Is called when "to language" value is changed.
   * Saves the new value to currTo
   * 
   * @param selected ISO code of selected country
   */
  onToChanged(selected: string) {
    this.currTo = selected
  }

  /**
   * Runs on initialisation, calls TranslatingService to get language options.
   * Sets "from" and "to" languages
   * In case of error, user is alerted
   */
  ngOnInit(): void {
    this._translatingService.getLanguages()
      .subscribe( data => {
        for(let i in data) {
          let splitted = data[i].split('-')
          this.languagePairs.push(new LanguagePair(splitted[0], splitted[1]))
        }
        this.fromLanguageOptions = []
        this.toLanguageOptions = []
        for (let i in this.languagePairs) {
          if (!this.fromLanguageOptions.includes(this.languagePairs[i].from)) {
            this.fromLanguageOptions.push(this.languagePairs[i].from)
          }
        }
        this.currFrom = this.fromLanguageOptions[0]
        this.onFromChanged(this.currFrom)
      },
      error => alert("Server error: " + error))
  }
}