 
export interface ICategory {
    categoryId: number;
    categoryTitle: string;
}

export interface IArticle {
    articleId: number;
    categoryId: number;
    articleTitle: string;
    articleSubTitle: string;
    articleContent: string;
}
  
export interface ISiteMenu {
    siteMenuId: number;
    siteMenuTitle: string;
}