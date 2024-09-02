import { Component, effect, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { IArticle } from '../dbObjects/blogObjects';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatCardModule, MatDividerModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  constructor() {
    effect(() => {
      if (this.contentService.$article().articleId > 0) {
        this.article = this.contentService.$article();
      }
    });
  }

  private contentService = inject(ContentService);

  public article: IArticle = {articleId: 0, categoryId: 0, articleTitle: '', articleSubTitle: '', articleContent:  ''};
}
