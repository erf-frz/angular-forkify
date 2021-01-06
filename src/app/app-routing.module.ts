import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './landing/landing.component';
import { LikePageComponent } from './like-page/like-page.component';
import { RecipeDetailGuard } from './recipes/recipe-detail/recipe-detail-guard';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  {path:'', component:LandingComponent},
  {path:'shopping-list', component:ShoppingListComponent},
  {path:'search', component:HeaderComponent, children:[
     {path:'recipes', component:RecipesComponent, children:[
       {path:'', component:RecipeStartComponent},
       {path:':id', component:RecipeDetailComponent}  //canActivate: [RecipeDetailGuard] ,
     ]}
  ]},
  {path:'liked', component:LikePageComponent, children:[
    {path:':id', component:RecipeDetailComponent}
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
