import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({providedIn:'root'})
export class RecipesService{
  constructor(private shoppingListService:ShoppingListService){}

   private recipes:Recipe[] = [];

  recipesChanged = new Subject<Recipe[]>();

  likedRecipes:Recipe[] = [];


   getRecipes(){
   return this.recipes;

 }

 setRecipes(recipes:Recipe[]){
      this.recipes = recipes;
   this.recipesChanged.next(this.recipes);
 }


 addToSl(ingredients){

  this.shoppingListService.addIngredients(ingredients);
 }

 addLikedRecipe(recipe:Recipe){
    this.likedRecipes.push(recipe);
 }

 getLikedRecipes(){
   return this.likedRecipes.slice();
 }

}
