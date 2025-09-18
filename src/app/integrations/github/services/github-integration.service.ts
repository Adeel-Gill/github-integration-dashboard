import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubIntegrationService {
  private base = `${environment.apiBase}`;

  constructor(private http: HttpClient) {}

  callback(code: string) {
    return this.http.post(`${this.base}/callback`, { code });
  }
  getAuthRedirect(): Observable<{ url: string }> {
    return this.http.get<{ url: string }>(`${this.base}/connect`);
  }

  getStatus(): Observable<{
    connected: boolean;
    connectedAt?: string;
    user?: any;
  }> {
    return this.http.get<any>(`${this.base}/status`);
  }

  removeIntegration(): Observable<any> {
    return this.http.delete(`${this.base}/remove`);
  }

  resyncIntegration(): Observable<any> {
    return this.http.post(`${this.base}/resync`, {});
  }

  listCollections(): Observable<string[]> {
    return this.http.get<string[]>(`${this.base}/collections`);
  }

  fetchCollection(
    collectionName: string,
    body: any
  ): Observable<{ total: number; data: any[] }> {
    return this.http.post<{ total: number; data: any[] }>(
      `${this.base}/collections/${collectionName}/query`,
      body
    );
  }
}
