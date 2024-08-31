import { Component, effect, inject, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ICategory, ISiteMenu } from '../dbObjects/blogObjects';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-navrow',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
  ],
  templateUrl: './navrow.component.html',
  styleUrl: './navrow.component.scss',
})
export class NavrowComponent {
  constructor() {
    effect(() => {
      if (this.contentService.$categories().length > 0) {
        this.navMenuItems2 = this.contentService.$categories();
        // console.log('>===>> ' + this.componentName + ' - Nav Menu Items - Categories Changed/Received:', this.navMenuItems2);
      }
    });
  }

  private contentService = inject(ContentService);

  componentName = this.constructor.name.replace('_', '');
  navbarName: string = 'Navigation';

  navMenuItems1: ISiteMenu[] = [
    { siteMenuId: 1, siteMenuTitle: 'Home' },
    { siteMenuId: 2, siteMenuTitle: 'About' },
    { siteMenuId: 3, siteMenuTitle: 'Contact' },
  ];

  navMenuItems2: ICategory[] = [];

  itemSiteMenuClicked(category: ISiteMenu): void {
    console.log('>===>> ' + this.componentName + ' - itemClicked', category);
    // this.contentService.getCategoryArticles(category.categoryId);
  }

  itemCategoryClicked(category: ICategory): void {
    // console.log('>===>> ' + this.componentName + ' - itemClicked', category);
    this.contentService.signalCategory(category.categoryId);
  }
}
