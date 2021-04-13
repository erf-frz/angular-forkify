import { Component,  OnDestroy,  OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../recipes/recipes.service';
import { DataStorageService } from '../shared/data-storage.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{

  constructor(
              private dataStorageService:DataStorageService,
              private recipeService:RecipesService,
              private router:Router,
              private route:ActivatedRoute) { }

  subs = new SubSink();
  queryDisplayed = false;

  searchForm:FormGroup;

  foodIsForbidden = true;

  @ViewChild('foodSearchItem')
  foodSearchItem: FormControl;

  errorMessage:string = null;


  ngOnInit() {
    this.searchForm = new FormGroup({
      'foodItem': new FormControl(null, Validators.required)
    });
  }


  invalidFoods(control:FormControl){
    if(control === undefined){
      return;
    }

    if(this.dataStorageService.foodList.indexOf(control.value)){
      this.foodIsForbidden = false;
  }
}


  onSubmit(){
    if(localStorage.getItem('recipes')){
      localStorage.removeItem('recipes');
    }
    const food = this.searchForm.value.foodItem;
    if(food !==null){

   this.subs.sink = this.dataStorageService.searchRecipes(food)
    .subscribe(recipes =>{
       console.log(recipes);
      this.recipeService.setRecipes(recipes);
       localStorage.setItem('recipes', JSON.stringify(recipes));
       } , error =>{
          console.log(error);
          this.errorMessage = 'Please select a food item from the bellow list.';
          error.error = this.errorMessage;

       });
    this.searchForm.reset();
    this.router.navigate(['recipes'],{relativeTo:this.route});
    }

  }


  displayQueries(){
    this.queryDisplayed = true;
  }

  handleClose(){
    this.queryDisplayed = false;
  }

  toHome(){
    this.router.navigate(['/']);
  }

  toSL(){
    this.router.navigate(['/shopping-list']);
  }

   toLikes(){
    this.router.navigate(['/liked']);
  }

  onHandleError(){
    this.errorMessage = null;
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

}
