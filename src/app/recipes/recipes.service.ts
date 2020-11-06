import { EventEmitter, Injectable } from '@angular/core';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from './ingredient.model';
import { Recipe } from './recipe.model';

@Injectable({providedIn:'root'})
export class RecipesService{
  constructor(private shoppingListService:ShoppingListService){}

   private recipes:Recipe[] = [];
  recipesChanged = new EventEmitter<Recipe[]>();

   getRecipes(){
   return this.recipes;

 }

 setRecipes(recipes:Recipe[]){

      this.recipes = recipes;
   this.recipesChanged.emit(this.recipes);
 }


 addToSl(ingredients:Ingredient[]){

  this.shoppingListService.addIngredients(ingredients);

 }


}
