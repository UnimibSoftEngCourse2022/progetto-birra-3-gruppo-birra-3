export class Ingredient {
  _id: string = "";
  name: string = "";
  type: string = "";
  quantity: number = 0;
}

export interface IngredientInterface {
  _id?: string;
  name?: string;
  type?: string;
  quantity?: number;
}
