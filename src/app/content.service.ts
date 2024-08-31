import { inject, Injectable, signal } from '@angular/core';
import { DataService } from './data.service';
import { ICategory } from './dbObjects/blogObjects';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  constructor() { 
    if (this.$categories.length === 0) this.signalCategories();
  }

  private dataService = inject(DataService);

  componentName = this.constructor.name.replace('_', '');

  public $categories = signal< ICategory[]>([]); 
  public $category = signal< ICategory>({categoryId: 0, categoryTitle: ''});

  public signalCategories(): void {
    this.dataService.getCategories().subscribe((categories: ICategory[]) => {
      this.$categories.set(categories);
    });
  }

  public signalCategory(id:number): void {
    if (this.$categories().length > 0) {
      let foundCategory = this.$categories().find((category: ICategory) => category.categoryId == id);
      if (foundCategory) {
        this.$category.set(foundCategory);
      } else {
        this.$category.set({categoryId: 0, categoryTitle: "Category Not Found!"});
      }
    }
  }


}
