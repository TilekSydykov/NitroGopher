import {Project} from '../models/project';
import {Model} from '../models/model';
import {IHash} from '../../services/storage/storage.service';
import {DbConnection} from '../models/db-connection';
import {EndPoint} from '../models/end-point';
import {GoFunction} from './inner-models/go-function';
import {CustomVariable} from './inner-models/customVariable';
import {Imports} from './util/imports';
import {GlobVars} from './util/glob-vars';
import {EnginePojo} from './inner-models/engine-pojo';

export class CodeEngine {
  imports: Imports = new Imports();
  glob: GlobVars = new GlobVars();
  pojo: EnginePojo = new EnginePojo();

  generateProjectCode(
    p: Project,
    ms: IHash<Model>,
    es: IHash<EndPoint>,
    dbs: IHash<DbConnection>): string {

    this.imports = new Imports();
    this.glob.vars = [];
    this.pojo.models = [];
    Object.keys(ms).forEach(i => {
      this.pojo.models.push(ms[i])
    });

    this.glob.add(new CustomVariable("db", "*gorm.DB"));

    if(p.dbConnection != ""){
      this.imports.add("gorm");
    }
    this.imports.add("http");
    p.codeVersion = p.version;
    let code = this.generateFirstPage();
    code += this.generateImports();
    code += this.glob.getVars();
    code += this.pojo.getModels();
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
    f.body = "db = getDatabase()\n";
    f.body += `  http.ListenAndServe(":${port}", nil)`;
    return f.get();
  }

  generateImports(): string{
    return this.imports.projectCurrentLibs()
  }

  generateDBFunction(conn: DbConnection): string{
    let connectionString = `"host=${conn.URL} user=${conn.DBUser} dbname=${conn.DBName} sslmode=disable password=${conn.Password}"`;
    let f = new GoFunction();
    f.name = "get database";
    f.body += `d, err := gorm.Open("postgres", ${connectionString})\n`;
    f.body += `  if err != nil {fmt.Println("error connecting db", err);panic(err)}\n`;
    f.body += this.pojo.getMigrations();
    f.body += `  return d`;
    f.returnTypes.push(new CustomVariable("", "*gorm.DB"));
    return f.get();
  }

}
