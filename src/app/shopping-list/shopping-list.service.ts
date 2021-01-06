import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ModifiedIngredient } from '../recipes/ingredient.model';


@Injectable({providedIn:'root'})
export class ShoppingListService{

  private ingredients:ModifiedIngredient[] = [];

  ingredientsChanged = new Subject<ModifiedIngredient[]>();

    startedEditing = new Subject<number>();




  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredients(ingredients:string[]){
    this.ingredients =this.editIngredients(ingredients);
    this.ingredientsChanged.next(this.ingredients);
  }

   addIngredient(ingredient:ModifiedIngredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  editIngredients(ingredients:string[]){

       const unitsLong = ['tablespoons','tablespoon','ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
       const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
       const units =[...unitsShort, 'kg', 'g'];

    const newIngredients =  ingredients.map(ing =>{
       // uniform units
          let ingredient= ing.toLowerCase();
        unitsLong.forEach((unit,index)=>{
        ingredient = ingredient.replace(unit, unitsShort[index]);
        });

      //remove parenthesis
        ingredient = ingredient.replace(/ *\([^)]*\) */g, '');

      //parse the ingredients into count,unit and ingredient
      const arrIng = ingredient.split(' ');
      const unitIndex = arrIng.findIndex(el => units.includes(el));

      let objIng;
        if (unitIndex > -1){
            //there is a unit
            const arrCount = arrIng.slice(0, unitIndex);

            let count;
            if (arrCount.length ===1){
                // count = arrIng[0];   just because of one of the examples that the unit was 1-1/2
                count = eval(arrIng[0].replace('-', '+'));
            }else{
              count = eval(arrIng.slice(0, unitIndex).join('+'));
            }
          objIng ={
            count,
            unit: arrIng[unitIndex],
            ingredient: arrIng.slice(unitIndex +1).join(' ')
            };


        }else if(parseInt(arrIng[0], 10)){
            //there is no unit, but the first element is a number
            objIng = {
                count:parseInt(arrIng[0], 10),
                unit: '',
                ingredient: arrIng.slice(1).join(' ')
            };

        }else if(unitIndex === -1){
            // there is no unit and no number in the first position
            objIng = {
                count:1,
                unit: '',
                ingredient
            };
        }
          return objIng;
    });
   console.log(newIngredients);
   return newIngredients;


 }


  getIngredient(index:number){
    return this.ingredients[index];
  }

  updateIngredient(index:number, newIngredient:ModifiedIngredient){
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index:number){
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

}
