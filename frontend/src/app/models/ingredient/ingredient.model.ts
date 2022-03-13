export class Ingredient {
  _id: string = "";
  name: string | null = null;
  type: string | null = null;
  quantity: number = 1;
}

export interface IngredientInterface {
  _id?: string;
  name?: string;
  type?: string;
  quantity?: number;
}
