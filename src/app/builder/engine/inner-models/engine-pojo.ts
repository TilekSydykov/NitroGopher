import {Model} from '../../models/model';

export class EnginePojo {
  models: Array<Model> = [];
  add(m: Model){

  }

  getModels(): string {
    let res = "";
    this.models.forEach(i=>{
      res += `type ${i.name} struct {\n`;
      i.fields.forEach(k=>{
        res += `  ${k.name} ${k.type.value}\n`;
      });
      res+= `}\n`
    });
    return res + "\n";
  }

  getMigrations(): string{
    let res = "";
    this.models.forEach(i => {
      res += `  d.AutoMigrate(&${i.name}{})\n`;
    });
    return res + "\n";
  }
}
