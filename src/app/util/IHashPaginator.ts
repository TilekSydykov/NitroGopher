import {IHash} from '../services/storage/storage.service';

export class IHashPaginator<T> {
  page: number;
  perpage: number;

  currentPageList: Array<T> = new Array<T>();
  pageCount: number = 0;
  private pagedList: Array<T>;

  constructor(hash: IHash<T> = {}, currentPage = 1, perPage = 10) {
    this.pagedList = [];
    Object.keys(hash).forEach(i => {
      this.pagedList.push(hash[i])
    });
    this.page = currentPage;
    this.perpage = perPage;
  }

  update(hash: IHash<T>){
    this.pagedList = [];
    Object.keys(hash).forEach(i => {
      this.pagedList.push(hash[i])
    });
    this.getPagesCount();
  }

  getPagesCount(): number{
    this.pageCount = Math.floor(this.pagedList.length / this.perpage) + 1;
    return this.pageCount;
  }

  getPage(n: number = 0): Array<T>{
    let last = false;
    if(n < 0 || this.page < 0){
      this.page = 1;
      n = this.page;
    }
    if(n == 0){
      n = this.page;
    }
    if(n >= this.getPagesCount()){
      n = this.pageCount;
      last = true;
      this.page = this.pageCount;
    }
    if (last){
      this.currentPageList = this.pagedList.slice(((n - 1) * this.perpage), this.pagedList.length  )
    } else {
      this.currentPageList = this.pagedList.slice(((n - 1) * this.perpage), n * this.perpage)
    }

    return this.currentPageList;
  }

  next(): Array<T>{
    this.page++;
    return this.getPage();
  }

  prev(): Array<T>{
    if(this.page == 1){
      return this.getPage();
    }
    this.page--;
    return this.getPage();
  }
}
