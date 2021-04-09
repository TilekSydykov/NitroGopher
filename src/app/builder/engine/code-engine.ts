import {Project} from '../models/Project';
import {Model} from '../models/Model';
import {IHash} from '../../services/storage/storage.service';
import {DBConnection} from '../models/DBConnection';
import {EndPoint} from '../models/EndPoint';
import {GoFunction} from './inner-models/go-function';

export class CodeEngine {
  generateProjectCode(
    p: Project,
    ms: IHash<Model>,
    es: IHash<EndPoint>,
    dbs: IHash<DBConnection>): string {

    p.codeVersion = p.version;
    let code = this.generateFirstPage();
    code += this.generateImports();
    code += this.generateMainFunction(p.port);
    return code;
  }

  generateFirstPage(): string{
    return "package main\n\n"
  }

  generateMainFunction(port: number): string{
    let f = new GoFunction();
    f.name = 'main';
    f.body = `http.ListenAndServe(":${port}", nil)`;
    return f.get();
  }

  generateImports(){
    return `import (\n"net/http"\n)\n\n`
  }

}
