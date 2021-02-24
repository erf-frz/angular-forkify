import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Ingredient } from '../ingredient.model';
import {  Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {


  recipe:Recipe;

  id:string;

  isLoading = false;

  @ViewChild('#likeBtn')
  likeBtn:ElementRef;



  constructor(private dataStorageService:DataStorageService,
              private recipeService:RecipesService,
              private route:ActivatedRoute) { }

  ngOnInit() {
    this.isLoading = true;
    if(localStorage.getItem('recipe')){
      this.isLoading = false;
       this.recipe = JSON.parse(localStorage.getItem('recipe'));
        }
     this.dataStorageService.selectedRecipe.subscribe(recipe =>{
      this.isLoading = false;
      if(recipe === undefined){
          return null;
      }else{
        this.recipe = recipe;
        localStorage.setItem('recipe',JSON.stringify(this.recipe));
        this.route.params.subscribe((params:Params)=>{
        this.recipe.recipe_id = params['id'];
        });
      }
    });

  }


  ngOnDestroy(){

  }

  onAddToSL(){
    let ingredients = this.recipe.ingredients;
    //console.log(ingredients);
    this.recipeService.addToSl(ingredients);

  }

  calculateTime(ingredients:Ingredient[]){

    //I roughly estimated that for each 4 ingredients, we would need 15 minutes of cooking, just to have a time here.
    const time = Math.round((ingredients.length/4)*15);
    return time;

  }

  onSaveRecipe(){
    const likedRecipe = this.recipe;
    this.recipeService.addLikedRecipe(likedRecipe);
    //console.log(likedRecipe);
  }




}
