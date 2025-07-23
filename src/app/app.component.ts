import { Component, inject } from '@angular/core';

import { PoThemeA11yEnum } from '@po-ui/ng-components';
import { ThfThemeService, poThemeTotvs } from '@totvs/themes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {

  private themeService = inject(ThfThemeService);

  constructor(){
    // Para utilizar o tema Light AAA Dark
    this.themeService.setTheme(poThemeTotvs, 1, PoThemeA11yEnum.AA)
  }

}
