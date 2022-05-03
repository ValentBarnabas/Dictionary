import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class TranslatingService {

  private key = "dict.1.1.20220503T175129Z.ec8a2330a20d0ad8.09875b85360ba8f78467e926c78a3031fa74badd"

  constructor(private http: HttpClient) { }

  getLanguages() {
    let headers = new HttpHeaders({
      'host': 'https://dictionary.yandex.net/api/v1/dicservice.json/getLangs?key='+this.key,
      'key': this.key
    })
    this.http
      .get<any>(('https://dictionary.yandex.net/api/v1/dicservice.json/getLangs?key='+this.key), {
        headers: headers
      })
      .subscribe( data => {
          console.log(data)
          // order items in pairs (split at '-'), and add them as option in rolldown menu
          // first having to choose language 1, then language 2 options pop up
        }
      )
  }

  getTranslation(word: string){
    if (word === '') {
      alert("Type in word to be translated")
      return;
    }
    let headers = new HttpHeaders({
      'host': 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=' + this.key + '&lang=en-de&text='+ word,
      'key': this.key
    })
    this.http
      .get<any>(('https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key='+this.key+'&lang=en-de&text='+ word), {
        headers: headers
      })
      .subscribe(data => {
        if (data.def.length === 0) {
          alert("Word does not exist, check for typo")
        } else {
          console.log(data.def)
        }
      })
  }
}