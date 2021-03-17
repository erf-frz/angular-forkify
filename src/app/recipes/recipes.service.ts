import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({providedIn:'root'})
export class RecipesService{
  constructor(private shoppingListService:ShoppingListService){}

  loadingSubject = new Subject<boolean>();
  likedRecipesSubject = new Subject<Recipe[]>();

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
   const likedRecipe = this.likedRecipes.find( el => el.title === recipe.title);
   if(likedRecipe){
     // if the recipe is already saved
     const savedRecipeIndex = this.likedRecipes.findIndex(el =>el.title === recipe.title);
     this.likedRecipes.splice(savedRecipeIndex,1);
     recipe.isLiked = false;
   }else{
     //if the recipe is not saved yet
      recipe.isLiked = true;
      this.likedRecipes.push(recipe);
   }
   this.likedRecipesSubject.next(this.likedRecipes);
   localStorage.setItem('likedRecipes',JSON.stringify(this.likedRecipes));
 }

 getLikedRecipes(){
   return this.likedRecipesSubject;
 }

 setLoadingStatus(isLoading: boolean){
    this.loadingSubject.next(isLoading);
 }

 getLoadingStatus(){
   return this.loadingSubject;
 }

}

