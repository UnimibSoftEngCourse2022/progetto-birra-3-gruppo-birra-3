import { Ingredient } from '../ingredient/ingredient.model';

export class Recipe {
  _id?: any;
  title?: string;
  color?: string;
  description?: string;
  published?: boolean;
  ingredients?: Ingredient[];
  equipmentProfileId?: string;
}
