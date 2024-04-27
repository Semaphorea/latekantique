import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import {OnInit} from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers:[TitleCasePipe]
})

export class ContactComponent implements OnInit {
  protected breadcrump:string[]=["accueil"];  
  protected titlecasePipe;
  constructor( titlecasePipe:TitleCasePipe) {
    this.titlecasePipe=titlecasePipe;}


  ngOnInit(): void {
      
    let path=window.location.pathname;
    path=path.substring(1,window.location.pathname.length);
  
    if (window.location.href.indexOf(path) > -1) {
          this.breadcrump.push(path);
  }
  }
}
 