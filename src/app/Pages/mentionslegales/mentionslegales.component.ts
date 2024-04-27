import { Component ,OnInit} from '@angular/core';

@Component({
  selector: 'app-mentionslegales',
  templateUrl: './mentionslegales.component.html',
  styleUrls: ['./mentionslegales.component.scss']  
})
export class MentionslegalesComponent {
   ngOnInit(){  
 
    if (window.location.href.indexOf('mentionslegales') > -1) {
      document.documentElement.style.setProperty('--body-size', '130rem');
    }
  }
}
  