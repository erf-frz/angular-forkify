import { Ingredient } from './ingredient.model';

export class Recipe{
  constructor(
    public image_url:string,
    public ingredients: Ingredient[],
    public publisher:string,
    public publisher_url:string,
    public recipe_id:string,
    public social_rank:number,
    public source_url:string,
    public title:string,
    public isLiked?:boolean
    ){}
}
