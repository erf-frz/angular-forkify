import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/Operators";
import { DataStorageService } from "src/app/shared/data-storage.service";

@Injectable({providedIn:'root'})
export class RecipeDetailGuard implements CanActivate{

  constructor(private dataStorageService:DataStorageService,
    private router:Router){}

  canActivate(route:ActivatedRouteSnapshot , state:RouterStateSnapshot):
  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
     return this.dataStorageService.selectedRecipe.pipe(map(recipe =>{
       if(recipe){
         return true;
       }
       else{
         this.router.createUrlTree(['/search/recipes']);
       }

     }))
  }
}
