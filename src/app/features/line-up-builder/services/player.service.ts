import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientBaseService, HttpOptions } from '../../../core/services/http-client-base.service';
import { SearchPlayerResponse } from '../models/search-player-response.model';
import { PlayerInfoResponse } from '../models/player-info-response.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  // Base API endpoint
  private readonly baseUrl = 'https://www.fifacm.com/api';


  constructor(private httpClient: HttpClientBaseService) { }

  /**
   * Search players by name
   */
  searchPlayers(searchTerm: string, options?: HttpOptions): Observable<SearchPlayerResponse[]> {
    const timestamp = Date.now(); // Cache-buster timestamp
    const year = '26';
    const version = '1';
    const url = `${this.baseUrl}/search?year=${year}&v=${version}&term=${encodeURIComponent(searchTerm)}&_=${timestamp}`;
    return this.httpClient.get<SearchPlayerResponse[]>(url, options);
  }

  /**
  * Get Player Details by ID
  */
  getPlayerInfo(playerId: string, options?: HttpOptions): Observable<PlayerInfoResponse> {
    const url = `${this.baseUrl}/getPlayerInfo?id=${playerId}`;
    return this.httpClient.get<PlayerInfoResponse>(url, options);
  }

}
