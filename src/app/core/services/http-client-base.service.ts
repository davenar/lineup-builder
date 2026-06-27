import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { FullscreenLoaderService } from './fullscreen-loader.service';

export interface HttpOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  params?: HttpParams | { [param: string]: string | string[] };
  withCredentials?: boolean;
  showFullscreenLoader?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientBaseService {
  private baseUrl: string = '';
  
  /**
   * Signal to track loading state
   */
  public loading = signal<boolean>(false);

  constructor(
    private http: HttpClient,
    private fullscreenLoader: FullscreenLoaderService
  ) {}

  /**
   * Set the base URL for all requests
   */
  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }

  /**
   * Set loading state and manage fullscreen loader
   */
  private setLoading(showFullscreen: boolean): void {
    this.loading.set(showFullscreen);
    
    if (showFullscreen) {
      this.fullscreenLoader.show();
    } else {
      this.fullscreenLoader.hide();
    }
  }

  /**
   * Get the full URL by concatenating base URL and endpoint
   */
  private getFullUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint}`;
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => error);
  }

  /**
   * GET - Retrieve data
   */
  get<T>(endpoint: string, options?: HttpOptions): Observable<T> {
    this.setLoading(options?.showFullscreenLoader || false);
    return this.http.get<T>(this.getFullUrl(endpoint), options)
      .pipe(
        catchError(this.handleError),
        finalize(() => this.setLoading(false))
      );
  }

  /**
   * POST - Create a new resource
   */
  post<T>(endpoint: string, body: any, options?: HttpOptions): Observable<T> {
    this.setLoading(options?.showFullscreenLoader || false);
    return this.http.post<T>(this.getFullUrl(endpoint), body, options)
      .pipe(
        catchError(this.handleError),
        finalize(() => this.setLoading(false))
      );
  }

  /**
   * PUT - Update a resource completely
   */
  put<T>(endpoint: string, body: any, options?: HttpOptions): Observable<T> {
    this.setLoading(options?.showFullscreenLoader || false);
    return this.http.put<T>(this.getFullUrl(endpoint), body, options)
      .pipe(
        catchError(this.handleError),
        finalize(() => this.setLoading(false))
      );
  }

  /**
   * PATCH - Partially update a resource
   */
  patch<T>(endpoint: string, body: any, options?: HttpOptions): Observable<T> {
    this.setLoading(options?.showFullscreenLoader || false);
    return this.http.patch<T>(this.getFullUrl(endpoint), body, options)
      .pipe(
        catchError(this.handleError),
        finalize(() => this.setLoading(false))
      );
  }

  /**
   * DELETE - Delete a resource
   */
  delete<T>(endpoint: string, options?: HttpOptions): Observable<T> {
    this.setLoading(options?.showFullscreenLoader || false);
    return this.http.delete<T>(this.getFullUrl(endpoint), options)
      .pipe(
        catchError(this.handleError),
        finalize(() => this.setLoading(false))
      );
  }

  /**
   * GET Blob - Download file as blob
   */
  getBlob(endpoint: string, options?: HttpOptions): Observable<Blob> {
    this.setLoading(options?.showFullscreenLoader || false);
    return this.http.get(this.getFullUrl(endpoint), { 
      ...options, 
      responseType: 'blob' 
    })
      .pipe(
        catchError(this.handleError),
        finalize(() => this.setLoading(false))
      );
  }

  /**
   * GET Text - Retrieve response as plain text
   */
  getText(endpoint: string, options?: HttpOptions): Observable<string> {
    this.setLoading(options?.showFullscreenLoader || false);
    return this.http.get(this.getFullUrl(endpoint), { 
      ...options, 
      responseType: 'text' 
    })
      .pipe(
        catchError(this.handleError),
        finalize(() => this.setLoading(false))
      );
  }

  /**
   * Download file and trigger browser download
   */
  downloadFile(endpoint: string, filename: string, options?: HttpOptions): void {
    this.getBlob(endpoint, options).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => console.error('Download failed:', error)
    });
  }
}