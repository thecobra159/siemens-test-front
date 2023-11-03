import { Component } from '@angular/core';
import { EquipmentsService } from './services/equipment/equipments.service';
import { Observable } from 'rxjs';
import { PointsService } from './services/points/points.service';
import { Equipment, EquipmentResponse } from './models/equipment/equipment.model';
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { PointResponse, PointUpdate } from './models/point/point.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Siemens Test API Front';
  faPencil = faPencil
  faTrash = faTrash
  faPlus = faPlus

  equipments$ = new Observable<EquipmentResponse[]>();
  points$ = new Observable<PointResponse[]>();

  // equipment form
  equipmentId = ''
  equipment: Equipment = {
    name: '',
    serialNumber: ''
  }

  // point form
  pointId = ''
  pointValue = ''
  point: PointUpdate = {
    name: '',
    dataType: '',
    equipmentId: '',
  }

  constructor(
    private equipmentsService: EquipmentsService,
    private pointService: PointsService) {
    this.getEquipments()
    this.getPoints()
  }

  addPointFromEquipment(id: string) {
    this.point.equipmentId = id
  }

  getEquipments() {
    this.equipments$ = this.equipmentsService.getAllEquipments()
  }

  getPoints() {
    this.points$ = this.pointService.getAllPoints()
  }

  onSaveEquipament() {
    if (this.equipment.name === '' || this.equipment.serialNumber === '') {
      return
    }

    if (this.equipmentId !== '') {
      return this.equipmentsService
      .updateEquipment(this.equipment, this.equipmentId)
      .subscribe(_ => {
        this.getEquipments()
        this.equipment = {
          name: '',
          serialNumber: ''
        }
        this.equipmentId = ''
      })
    }

    return this.equipmentsService
      .createEquipment(this.equipment)
      .subscribe(_ => {
        this.getEquipments()
        this.equipment = {
          name: '',
          serialNumber: ''
        }
        this.equipmentId = ''
      })
  }

  onSavePoint() {
    if (this.point.name === ''
        || this.point.dataType === ''
        || this.point.equipmentId === ''
        || this.pointValue === '') {
      return
    }

    if (this.pointId !== '') {
      return this.pointService
      .updatePoint({...this.point, ...(this.pointValue !== '' && {value: Number(this.pointValue)})}, this.pointId)
      .subscribe(_ => {
        this.getPoints()
        this.point = {
          name: '',
          dataType: '',
          equipmentId: ''
        }
        this.pointId = ''
        this.pointValue = ''
      })
    }

    return this.pointService
      .createPoint({
        name: this.point.name!,
        dataType: this.point.dataType!,
        equipmentId: this.point.equipmentId!,
        value: Number(this.pointValue)
      })
      .subscribe(_ => {
        this.getPoints()
        this.point = {
          name: '',
          dataType: '',
          equipmentId: ''
        }
        this.pointId = ''
        this.pointValue = ''
      })
  }

  editFields(equipment: EquipmentResponse) {
    this.getEquipments()
    this.equipment = {...equipment}
    this.equipmentId = equipment._id
  }

  editPointFields(point: PointResponse) {
    this.getPoints()
    this.point = {...point}
    this.pointId = point._id
    this.pointValue = point.value.toString()
  }

  deleteEquipament(id: string) {
    this.equipmentsService
      .deleteEquipament(id)
      .subscribe(_ => this.getEquipments())
  }

  deletePoint(id: string) {
    this.pointService
      .deletePoint(id)
      .subscribe(_ => this.getPoints())
  }
}
