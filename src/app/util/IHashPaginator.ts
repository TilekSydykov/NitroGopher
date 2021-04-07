import {IHash} from '../services/storage/storage.service';

export class IHashPaginator<T> {
  private page: number;
  private perpage: number;

  currentPageList: Array<T> = new Array<T>();
  pageCount: number = 0;
  private pagedList: Array<T>;

  constructor(hash: IHash<T> = {}, currentPage = 1, perPage = 20) {
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
    if(n < 1){
      n = this.page;
    }
    if(n >= this.getPagesCount()){
      n = this.getPagesCount();
      last = true;
    }
    if (last){
      this.currentPageList = this.pagedList.slice(((n - 1) * this.perpage), this.pagedList.length  )
    } else {
      this.currentPageList = this.pagedList.slice(((n - 1) * this.perpage), n * this.perpage )
    }

    return this.currentPageList;
  }

  next(): Array<T>{
    this.page++;
    return this.getPage();
  }

  prev(): Array<T>{
    this.page--;
    return this.getPage();
  }
}
