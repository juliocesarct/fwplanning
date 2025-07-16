import { Component } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';
import { PoThemeA11yEnum } from '@po-ui/ng-components';
import { ThfThemeService, poThemeSunset, poThemeTotvs, poThemeTotvsAA } from '@totvs/themes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {

  constructor(private themeService: ThfThemeService){
    // Para utilizar o tema Light AAA Dark
    this.themeService.setTheme(poThemeTotvs, 1, PoThemeA11yEnum.AA)
  }

}
