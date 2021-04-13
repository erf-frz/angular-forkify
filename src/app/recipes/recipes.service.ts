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
  const likedRecipesString = localStorage.getItem('likedRecipes');
  const likedRecipes = likedRecipesString ? JSON.parse(likedRecipesString) as Recipe[] : [];
   const likedRecipe = likedRecipes.find( el => el.title === recipe.title);
   if(likedRecipe){
     // if the recipe is already saved
     const savedRecipeIndex = likedRecipes.findIndex(el =>el.title === recipe.title);
     likedRecipes.splice(savedRecipeIndex,1);
   }else{
     //if the recipe is not saved yet
      likedRecipes.push(recipe);
   }
   this.likedRecipesSubject.next(likedRecipes);
   localStorage.setItem('likedRecipes',JSON.stringify(likedRecipes));
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