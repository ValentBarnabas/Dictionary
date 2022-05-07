import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';

/**
 * Service for calling Yandex Dictionary API
 * Has functions for getting a list of translation language pairs,
 * translating a given word, and handling HTTP errors.
 */
@Injectable()
export class TranslatingService {

  private key = "dict.1.1.20220503T175129Z.ec8a2330a20d0ad8.09875b85360ba8f78467e926c78a3031fa74badd"

  constructor(private http: HttpClient) { }

  /**
   * Async function for getting possible translation directions.
   * 
   * @returns String of country ISO codes, in a form of xx-yy, where xy is from and yy is to
   */
  getLanguages() : Observable<String> {
    var url = 'https://dictionary.yandex.net/api/v1/dicservice.json/getLangs?key='+this.key
    return this.http
      .get<String>((url))
      .pipe(catchError(this.errorHandler))
  }

  /**
   * Returns all possible translations of the given word in a specially formatted JSON object 
   * 
   * @param word word to be translated
   * @param from source language
   * @param to destination language
   * @returns any object (specially formatted JSON)
   */
  getTranslation(word: string, from: string, to: string) : Observable<any> {
    var url = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=' + this.key + '&lang=' + from.toLowerCase() + '-' + to.toLowerCase() + '&text='+ encodeURIComponent(word)
    return this.http
      .get<any>(url)
      .pipe(catchError(this.errorHandler))
  }

  /**
   * Function for handling HTTP errors. Returns a new error
   * 
   * @param error an HTTP error message
   * @returns a new error
   */
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Server error");
  }
}