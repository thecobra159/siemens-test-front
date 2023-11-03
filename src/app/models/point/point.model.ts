export type PointResponse = {
  _id: string
  name: string
  dataType: string
  value: number
  equipmentId: string
}

export type Point = Omit<PointResponse, '_id'>

export type PointUpdate = Partial<Point>
