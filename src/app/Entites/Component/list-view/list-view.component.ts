import {
  Component,    ContentChild,    ElementRef,    EventEmitter,
  HostListener,    Input,    OnChanges,    OnInit,    Output,
  TemplateRef,    ViewChild,Inject
} from '@angular/core';
import { CommonModule,NgIf } from '@angular/common';
import { Currencies } from 'forex-rates';

@Component({
  
  selector: 'list-view',
  standalone:true,   
  templateUrl: 'list-view.component.html',
  imports:[CommonModule,NgIf],
  styleUrls: ['./list-view.component.scss']
})


export class ListViewComponent implements OnInit, OnChanges {
  
  //// les entrées / sorties  
  
  // le lien vers l'input
  @Input() field: HTMLInputElement;
  // liste des items de la liste
  @Input() items:any[];  
  // nom de la propriété de l'item qui sera affichée dans l'input
  @Input() propertyId = 'id';
  // nom de la propriété de l'item qui sera affichée dans l'input
  @Input() propertyDisplay = 'text';
  // sélectionner la 1ère valeur par défaut
  @Input() selectFirstValue = true;
  
  // valeur sélectionnée entrée / sortie
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();
  
   
  
  // Est-ce que le menu de la liste est visible ?
  public visible = false;
    
  @ViewChild('menuList', { read: ElementRef, static: true }) menuList: ElementRef;
  @ContentChild(TemplateRef, { static: false }) template:any; //Template personnalisé
  
  constructor(field:HTMLInputElement,@Inject('items') items: any[],menuList:ElementRef) { 
    this.field=field;
    this.items=items;
    this.menuList=menuList;
  }
  

  ngOnInit() {
      if (this.field) {
          this.stylyzeField(this.field);

          this.field.addEventListener('click', () => {
              this.visible = !this.visible;
          });
      }
  }

  ngOnChanges() {
      this.initializeDefaultSelection();
  }
  
  //Ferme la list si l'on clique à côté du menu
  @HostListener('document:click', ['$event'])
  clickedOutside(event: Event) {
      const elt = event.target as Element;
      if (elt !== this.field) {
          if (this.menuList && this.menuList.nativeElement !== event.target && !this.menuList.nativeElement.contains(elt)) {
              this.visible = false;
          }
      }
  }

  public select(model: any) {
      this.valueChange.emit(model);
      this.field.value = model[this.propertyDisplay];
      this.visible = false;
  }

  //

  private stylyzeField(field: HTMLInputElement) {
      field.setAttribute('autocomplete', 'off');
      field.setAttribute('readonly', 'readonly');
      field.style.background = '#FFFFFF url(/assets/Images/Component/arrow-bottom.png) no-repeat right';
      field.style.backgroundSize = '23px 25px';
      field.style.cursor = 'pointer';
      field.style.paddingRight = '28px';  
      field.style.userSelect = 'none';  

      field.addEventListener('select', () => {
          field.selectionStart = field.selectionEnd;
      });
  }

  private initializeDefaultSelection() {
      if (this.items && this.items.length > 0) {
          let item = null;

          if (this.value) {
              item = this.items.find(x => x[this.propertyId] === this.value[this.propertyId]);
          } else if (this.selectFirstValue) {
              item = this.items[0];
          }
          if (item !== null) this.select(item);
      }
  }

}