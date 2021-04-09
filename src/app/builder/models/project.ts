import {DbConnection} from './db-connection';
import {IHash} from '../../services/storage/storage.service';

export class Project {
  ID: string = "";
  name: string = "";

  version: number = 0;

  port: number = 8080;

  code: string = "";
  codeVersion: number = -1;

  endPoints: IHash<EndPointReference> = {};
  dbConnection: string = "";
}

export class EndPointReference {
  key: string = "";
  value: string = "";
}
