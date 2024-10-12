import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { IArticle, ICategory } from './dbObjects/blogObjects';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  private http = inject(HttpClient);

  componentName = this.constructor.name.replace('_', '');
  // baseURL: string = '/assets/';
  // baseURL: string = 'http://localhost:8080/blogapi/';
  baseURL: string = environment.apiUrl;



  getCategories(): Observable<ICategory[]> {
    // console.log('baseURL: ' + this.baseURL);
    return this.http
      .get<ICategory[]>(this.baseURL + `categories`)    // (this.baseURL + `categories.json`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getCategory(categoryId: number): Observable<ICategory> {
    return this.http
      .get<ICategory>(this.baseURL + `categories` + '/categoryId/' + categoryId)       
      .pipe(retry(1), catchError(this.handleError));
  }
  

  getArticles(): Observable<IArticle[]> {
    return this.http
      .get<IArticle[]>(this.baseURL + `articles`)       // (this.baseURL + `articles.json`)
      .pipe(retry(1), catchError(this.handleError));
  }

  getCategoryArticles(categoryId: number): Observable<IArticle[]> {
    return this.http
    .get<IArticle[]>(this.baseURL + `articles` + '/categoryId/' + categoryId)       
    .pipe(retry(1), catchError(this.handleError));
  }

  getArticle(articleId: number): Observable<IArticle> {
    return this.http
      .get<IArticle>(this.baseURL + `articles` + '/articleId/' + articleId)       
      .pipe(retry(1), catchError(this.handleError));
  }



  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
