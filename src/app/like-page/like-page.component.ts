import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-like-page',
  templateUrl: './like-page.component.html',
  styleUrls: ['./like-page.component.css']
})
export class LikePageComponent implements OnInit {

  constructor( private router:Router,
                private recipeService:RecipesService,
                private dataStorageService:DataStorageService) { }

  recipes:Recipe[] = [];
  recipeDetailDisplayed = false;

  ngOnInit() {
  this.recipes = this.recipeService.getLikedRecipes();
  console.log(this.recipes);
  }

  recipeSelected(id:string){
    this.dataStorageService.getRecipe(id).subscribe(recipe =>{
    this.dataStorageService.selectedRecipe.next(recipe);
    });

  }

  toShoppingList(){
    this.router.navigate(['/shopping-list']);
  }

  toHome(){
    this.router.navigate(['/']);
  }


}
