import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  toShoppingList(){
    this.router.navigate(['/shopping-list']);
  }

  toSearch(){
    this.router.navigate(['/search']);
  }

  toLikes(){
    this.router.navigate(['/liked']);
  }
}
