import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { options } from '../utils/constansts'
import { Equipment, EquipmentResponse, EquipmentUpdate } from 'src/app/models/equipment/equipment.model'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class EquipmentsService {
  private apiUrl = `${environment.api}/equipment`

  constructor(private httpClient: HttpClient) {}

  getAllEquipments(): Observable<EquipmentResponse[]> {
    return this.httpClient.get<EquipmentResponse[]>(this.apiUrl, options)
  }

  createEquipment(equipment: Equipment): Observable<EquipmentResponse> {
    return this.httpClient.post<EquipmentResponse>(
      this.apiUrl,
      JSON.stringify(equipment),
      options,
    )
  }

  updateEquipment(equipment: EquipmentUpdate, id: string) {
    return this.httpClient.put<EquipmentResponse>(
      `${this.apiUrl}/${id}`,
      JSON.stringify(equipment),
      options,
    )
  }

  deleteEquipament(id: string) {
    return this.httpClient.delete<boolean>(
      `${this.apiUrl}/${id}`,
      options,
    )
  }
}
