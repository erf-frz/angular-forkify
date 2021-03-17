import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-like-page',
  templateUrl: './like-page.component.html',
  styleUrls: ['./like-page.component.css']
})
export class LikePageComponent implements OnInit, OnDestroy {

  getLikedRecipesSubscription$$: Subscription;
  likedRecipes$: Observable<Recipe[]>;

  constructor(
    private router:Router,
    private recipeService:RecipesService,
    private dataStorageService:DataStorageService) { }

  ngOnDestroy(): void {
    this.getLikedRecipesSubscription$$.unsubscribe();
  }

  recipes:Recipe[] = [];
  recipeDetailDisplayed = false;

  ngOnInit() {
    this.getLikedRecipesSubscription$$ = this.recipeService.likedRecipesSubject.subscribe(recipes => this.recipes = recipes);

    if(localStorage.getItem('likedRecipes')){
      this.recipes = JSON.parse(localStorage.getItem('likedRecipes'));
    }
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
