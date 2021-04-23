export class Param {
  params: Map<string, string>= new Map([]);

  getWindowParam(name: string): string | undefined {
      this.getWindowParams();
      return this.params.get(name)
  }

  getWindowParams(){
      let p = window.location.href.split("?");

      let a: Array<string> = (p.length > 1) ? p[1].split("&") : [];
      if (a.length > 0){
        a.forEach(i => {
          let g = i.split("=");
          (g.length > 1)? this.params.set(g[0], g[1]): null;
        })
      }
  }

  setWindowParam(key: string, value: string){
      this.getWindowParams();
      this.params.set(key, value);
      location.assign(window.location.href.split("?")[0] + this.getParamsString())
  }

  getParamsString(): string{
    let str = "";
    (this.params.size > 0)? str = "?":null;
    for (let key of this.params.keys()) {
      str += `${key}=${this.params.get(key)}&`
    }
    return str;
  }
}
