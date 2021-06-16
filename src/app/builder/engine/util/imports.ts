import {IHash} from '../../../services/storage/storage.service';

export class Imports {
  libs: IHash<String> = {};

  currentImports: Array<String> = [];

  projectCurrentLibs(): string{
    let res  = `import (\n`;
    this.currentImports.forEach(i => {
      res += `  "${i}"\n`
    });
    return res + ")\n\n"
  }

  add(libName: string){
    if (this.libs.hasOwnProperty(libName)){
      this.currentImports.push(this.libs[libName])
    }
  }

  constructor() {
    this.libs["fmt"] = "fmt";
    this.libs["gorm"] = "github.com/jinzhu/gorm";
    this.libs["http"] = "net/http";
  }
}
