import { inject, Injectable, signal } from '@angular/core';
import { DataService } from './data.service';
import { IArticle, ICategory } from './dbObjects/blogObjects';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  constructor() { 
    if (this.$categories.length === 0) this.signalCategories();
    if (this.articles.length === 0) this.getAllArticles();
  }

  private dataService = inject(DataService);

  componentName = this.constructor.name.replace('_', '');

  public $categories = signal< ICategory[]>([]); 
  public $category = signal< ICategory>({categoryId: 0, categoryTitle: ''});
  // public $articles = signal< IArticle[]>([]); 
  private articles: IArticle[] = [];
  public $article = signal< IArticle>({articleId: 0, categoryId: 0, articleTitle: '', articleContent:  ''});
  public $categoryArticles = signal< IArticle[]>([]); 



  public signalCategories(): void {
    this.dataService.getCategories().subscribe((categories: ICategory[]) => {
      this.$categories.set(categories);
      if (this.$category().categoryId === 0) this.signalCategory(1);
    });
  }

  public signalCategory(categoryId:number): void {
    if (this.$categories().length > 0) {
      let foundCategory = this.$categories().find((category: ICategory) => category.categoryId == categoryId);
      if (foundCategory) {
        this.$category.set(foundCategory);
        this.signalCategoryArticles(categoryId);
      } else {
        this.$category.set({categoryId: 0, categoryTitle: "Category Not Found!"});
      }
    }
  }



  public getAllArticles(): void {
    this.dataService.getArticles().subscribe((articles: IArticle[]) => {
      this.articles=articles;
      if ( this.$categoryArticles().length == 0) this.signalCategoryArticles(1);
    });
  }

  public signalCategoryArticles(categoryId: number): void {
    if (this.articles.length > 0) {
       let categoryArticles: IArticle[] = [];
        categoryArticles = this.articles.filter((article: IArticle) => article.categoryId === categoryId);
        this.$categoryArticles.set(categoryArticles);
        this.signalArticle(this.$categoryArticles()[0].articleId); 
    }
  }

  public signalArticle(articleId:number): void {
    if (this.articles.length > 0) {
      let foundArticle = this.articles.find((article: IArticle) => article.articleId == articleId);
      if (foundArticle) {
        this.$article.set(foundArticle);
      } else {
        this.$article.set({articleId: 0, categoryId: 0, articleTitle: "Article Not Found!", articleContent: "Not Found!"});
      }
    }
  }


}
