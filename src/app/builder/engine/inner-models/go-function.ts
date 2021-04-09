export class GoFunction {
  name: string = "";
  body: string = "";

  structName(): string{
    let n = this.name.split(/[^A-Za-z]/);
    let name = "";
    let index = 0;
    n.forEach(i=> {
      if(i !== ""){
        if(index == 0){
          name += i
        }else {
          name += i.slice(0,1).toUpperCase() + i.slice(1, i.length)
        }
        index++;
      }
    });
    return name
  }

  get(): string{
    return`func ${this.structName()}(){\n   ${this.body}\n}`
  }
}
