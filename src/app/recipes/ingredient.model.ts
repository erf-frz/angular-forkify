export class Ingredient {
  constructor(
    public ingredient: string
  ){}
}


export class ModifiedIngredient {
  constructor(
    public count: number,
    public unit: string,
    public ingredient: string
  ){}
}
