import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { Equipment, EquipmentResponse, EquipmentUpdate } from 'src/app/models/equipment/equipment.model'

@Injectable({
  providedIn: 'root',
})
export class EquipmentsService {
  private apiUrl = `${environment.api}/equipment`

  constructor(private httpClient: HttpClient) {}

  getAllEquipments(): Observable<EquipmentResponse[]> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    }

    return this.httpClient.get<EquipmentResponse[]>(this.apiUrl, options)
  }

  createEquipment(equipment: Equipment): Observable<EquipmentResponse> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    }

    return this.httpClient.post<EquipmentResponse>(
      this.apiUrl,
      JSON.stringify(equipment),
      options,
    )
  }

  updateEquipment(equipment: EquipmentUpdate, id: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    }

    return this.httpClient.put<EquipmentResponse>(
      `${this.apiUrl}/${id}`,
      JSON.stringify(equipment),
      options,
    )
  }

  deleteEquipament(id: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    }

    return this.httpClient.delete<boolean>(
      `${this.apiUrl}/${id}`,
      options,
    )
  }
}
