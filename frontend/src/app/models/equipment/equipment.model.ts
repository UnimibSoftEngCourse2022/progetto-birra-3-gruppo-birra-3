export interface EquipmentInterface {
  _id: string;
  name: string;
  unit: string;
  quantity: number;
}

export class Equipment {
  _id?: string;
  name?: string;
  unit?: string;
  quantity?: number;
}

export class EquipmentProfile {
  _id?: string;
  title?: string;
  equipments?: Equipment[];
}
