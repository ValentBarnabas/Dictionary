import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TranslatingService {

  private key = "dict.1.1.20220503T175129Z.ec8a2330a20d0ad8.09875b85360ba8f78467e926c78a3031fa74badd"

  constructor(private http: HttpClient) { }

  // order items in pairs (split at '-'), and add them as option in rolldown menu
  getLanguages() : Observable<String> {
    let headers = new HttpHeaders({
      'host': 'https://dictionary.yandex.net/api/v1/dicservice.json/getLangs?key='+this.key,
      'key': this.key
    })
    return this.http
      .get<String>(('https://dictionary.yandex.net/api/v1/dicservice.json/getLangs?key='+this.key), {
        headers: headers
      })
  }

  getTranslation(word: string, from: string, to: string) : Observable<any> {
    let headers = new HttpHeaders({
      'host': 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=' + this.key + '&lang=' + from.toLowerCase() + '-' + to.toLowerCase + '&text='+ encodeURIComponent(word),
      'key': this.key
    })
    return this.http
    .get<any>(('https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key='+this.key+'&lang=' + from.toLowerCase() + '-' + to.toLowerCase() + '&text='+ encodeURIComponent(word)), {
    // .get<any>(('https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key='+this.key+'&lang=en-it&text='+ encodeURIComponent(word)), { //TODO: delete, its only for testing
      headers: headers
      })
  }
}