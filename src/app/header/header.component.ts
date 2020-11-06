import { Component,  OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(private dataStorageService:DataStorageService,
              private router:Router,
              private route:ActivatedRoute) { }


  queryDisplayed = false;

  searchForm:FormGroup;

  foodIsForbidden = true;

  @ViewChild('foodSearchItem')
  foodSearchItem: FormControl;

  // error:string = null;


  ngOnInit() {
    this.searchForm = new FormGroup({
      'foodItem': new FormControl(null, Validators.required)
    });

    // this.dataStorageService.error.subscribe((error:string)=>{
    //   this.error = error;
    // })
  }


  invalidFoods(control:FormControl){
    if(control === undefined){
      return;
    }

    if(this.dataStorageService.foodList.indexOf(control.value)){
      this.foodIsForbidden = false;
  }
}

  // onSubmit(form:NgForm){

  //   const food = form.value.foodItem;
  //   console.log(form);
  //   this.dataStorageService.searchRecipes(food);
  //   this.router.navigate(['recipes'],{relativeTo:this.route});
  // }

  onSubmit(){
    const food = this.searchForm.value.foodItem;
    console.log(this.searchForm);
    if(food !==null){
    this.dataStorageService.searchRecipes(food);
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
}
