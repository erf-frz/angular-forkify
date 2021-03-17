import { HttpClient } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import {  map } from 'rxjs/Operators';
import { Subject} from 'rxjs';



@Injectable({providedIn:'root'})
export class DataStorageService{


selectedRecipe = new Subject<Recipe>();

errorMessage:string = null;

  constructor(private http:HttpClient){}


  searchRecipes(query:string){
     return this.http.get<{count:number, recipes:Recipe[]}>('https://forkify-api.herokuapp.com/api/search?q='+ query)
     .pipe(map(recipes => recipes.recipes));

 }

 getRecipe(id:string){
   return this.http.get
   <{recipe:Recipe}>
   ('https://forkify-api.herokuapp.com/api/get?rId=' + id)
   .pipe(map(recipeObj =>{
     return recipeObj.recipe;
   }));
 }

  foodList = [
'carrot',
'broccoli',
'asparagus',
'cauliflower',
'corn',
'cucumber',
'green pepper',
'lettuce',
'mushrooms',
'onion',
'potato',
'pumpkin',
'red pepper',
'tomato',
'beetroot',
'brussel sprouts',
'peas',
'zucchini',
'radish',
'sweet potato',
'artichoke',
'leek',
'cabbage',
'celery',
'chili',
'garlic',
'basil',
'coriander',
'parsley',
'dill',
'rosemary',
'oregano',
'cinnamon',
'saffron',
'green bean',
'bean',
'chickpea',
'lentil',
'apple',
'apricot',
'avocado',
'banana',
'blackberry',
'blackcurrant',
'blueberry',
'boysenberry',
'cherry',
'coconut',
'fig',
'grape',
'grapefruit',
'kiwifruit',
'lemon',
'lime',
'lychee',
'mandarin',
'mango',
'melon',
'nectarine',
'orange',
'papaya',
'passion fruit',
'peach',
'pear',
'pineapple',
'plum',
'pomegranate',
'quince',
'raspberry',
'strawberry',
'watermelon',
'salad',
'pizza',
'pasta',
'popcorn',
'lobster',
'steak',
'bbq',
'pudding',
'hamburger',
'pie',
'cake',
'sausage',
'tacos',
'kebab',
'poutine',
'seafood',
'chips',
'fries',
'masala',
'paella',
'som tam',
'chicken',
'toast',
'marzipan',
'tofu',
'ketchup',
'hummus',
'chili',
'maple syrup',
'parma ham',
'fajitas',
'champ',
'lasagna',
'poke',
'chocolate',
'croissant',
'arepas',
'bunny chow',
'pierogi',
'donuts',
'rendang',
'sushi',
'ice cream',
'duck',
'curry',
'beef',
'goat',
'lamb',
'turkey',
'pork',
'fish',
'crab',
'bacon',
'ham',
'pepperoni',
'salami',
'ribs',
  ];

}
