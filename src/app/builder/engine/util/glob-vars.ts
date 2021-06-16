import {IHash} from '../../../services/storage/storage.service';
import {CustomVariable} from '../inner-models/customVariable';

export class GlobVars {
  vars: Array<CustomVariable> = [];

  getVars(): string{
    let res = "";
    this.vars.forEach(i=>{
      res += `${i.name} ${i.type};\n`
    });
    return res + "\n";
  }

  add(v: CustomVariable){
    this.vars.push(v)
  }
}
