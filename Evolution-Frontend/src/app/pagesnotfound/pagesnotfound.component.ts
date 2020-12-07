import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagesnotfound',
  templateUrl: './pagesnotfound.component.html',
  styles: []
})
export class PagesnotfoundComponent implements OnInit {

  Date = new Date().getFullYear();
  constructor() { }

  ngOnInit(): void {
  }

}
