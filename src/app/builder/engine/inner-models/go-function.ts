import {CustomVariable} from './customVariable';

export class GoFunction {
  name: string = "";
  body: string = "";
  returnTypes: Array<CustomVariable> = [];
  inputTypes: Array<CustomVariable> = [];

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
    let r = this.generateReturn("");
    let input = this.generateInputs("");
    return`func ${this.structName()}(${input})${r}{\n  ${this.body}\n}\n\n`
  }

  generateInputs(i: string): string{
    return i
  }

  generateReturn(r: string): string{
    if(this.returnTypes.length > 0){
      r += "(";
      for (let i = 0; i < this.returnTypes.length; i++) {
        r+= this.returnTypes[i].type;
        if(i != this.returnTypes.length - 1){
          r += ","
        }
      }
      r += ")";
    }
    return r;
  }
}
