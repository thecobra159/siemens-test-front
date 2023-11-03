export type EquipmentResponse = {
  _id: string
  name: string
  serialNumber: string
}

export type Equipment = Omit<EquipmentResponse, '_id'>

export type EquipmentUpdate = Partial<Equipment>
