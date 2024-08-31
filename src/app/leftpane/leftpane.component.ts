import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { ContentService } from '../content.service';
import { ICategory } from '../dbObjects/blogObjects';


export interface IArticle {
  articleId: number;
  articleTitle: string;
}

@Component({
  selector: 'app-leftpane',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
  ],
  templateUrl: './leftpane.component.html',
  styleUrl: './leftpane.component.scss'
})
export class LeftpaneComponent {

  constructor() {
    effect(() => {
      if (this.contentService.$category().categoryId > 0) {
        this.category = this.contentService.$category();
        // console.log('>===>> ' + this.componentName + ' - Category Changed/Received:', this.category.categoryTitle);
      }
    });
  }

  private contentService = inject(ContentService);

  componentName = this.constructor.name.replace('_', '');

  category: ICategory = {categoryId: 0, categoryTitle: ''};
  selectedItem: number | null = null;
  listItems: IArticle[] = [
    {articleId: 1, articleTitle: 'Article 1'},
    {articleId: 2, articleTitle: 'Article 2'},
    {articleId: 3, articleTitle: 'Article 3'},
    {articleId: 4, articleTitle: 'Article 4'},
    {articleId: 5, articleTitle: 'Article 5'},
  ]; 



  itemClicked(item: IArticle, i: number): void {
    this.selectedItem = i;
    // this.contentService.updateArticleLikes(item.articleId, 'views');
  }




}
