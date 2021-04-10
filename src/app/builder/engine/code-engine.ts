import {Project} from '../models/project';
import {Model} from '../models/model';
import {IHash} from '../../services/storage/storage.service';
import {DbConnection} from '../models/db-connection';
import {EndPoint} from '../models/end-point';
import {GoFunction} from './inner-models/go-function';

export class CodeEngine {
  generateProjectCode(
    p: Project,
    ms: IHash<Model>,
    es: IHash<EndPoint>,
    dbs: IHash<DbConnection>): string {

    p.codeVersion = p.version;
    let code = this.generateFirstPage();
    code += this.generateImports();
    if(p.dbConnection != ""){
      code += this.generateDBFunction(dbs[p.dbConnection]);
    }
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

  generateDBFunction(conn: DbConnection): string{
    let connectionString = `"host=${conn.URL} user=${conn.DBUser} dbname=${conn.DBName} sslmode=disable password=${conn.Password}"`;
    let f = new GoFunction();
    f.name = "get database";
    f.body += `db, err := gorm.Open("postgres", ${connectionString})\n`;
    f.body += `   if err != nil {fmt.Println("error connecting db", err);panic(err)}\n`;
    f.body += `   return db`;
    return f.get();
  }

}
