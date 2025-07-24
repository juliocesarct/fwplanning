import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { PoModule, PoThemeA11yEnum } from '@po-ui/ng-components';
import { ThfThemeService, poThemeTotvs } from '@totvs/themes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [PoModule, CommonModule, RouterOutlet, RouterOutlet],
  styleUrls: ['./app.component.css'],
  standalone: true
})
export class AppComponent {

  private themeService = inject(ThfThemeService);

  constructor(){
    // Para utilizar o tema Light AAA Dark
    this.themeService.setTheme(poThemeTotvs, 1, PoThemeA11yEnum.AA)
  }

}
