import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { options } from '../utils/constansts'
import { HttpClient } from '@angular/common/http';
import { Point, PointResponse, PointUpdate } from 'src/app/models/point/point.model';

@Injectable({
  providedIn: 'root'
})
export class PointsService {

  private apiUrl = `${environment.api}/point`

  constructor(private httpClient: HttpClient) {}

  getAllPoints(): Observable<PointResponse[]> {
    return this.httpClient.get<PointResponse[]>(this.apiUrl, options)
  }

  createPoint(point: Point): Observable<PointResponse> {
    return this.httpClient.post<PointResponse>(
      this.apiUrl,
      JSON.stringify(point),
      options,
    )
  }

  updatePoint(point: PointUpdate, id: string) {
    return this.httpClient.put<PointResponse>(
      `${this.apiUrl}/${id}`,
      JSON.stringify(point),
      options,
    )
  }

  deletePoint(id: string) {
    return this.httpClient.delete<boolean>(
      `${this.apiUrl}/${id}`,
      options,
    )
  }
}
