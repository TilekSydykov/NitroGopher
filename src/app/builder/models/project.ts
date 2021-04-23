import {IHash} from '../../services/storage/storage.service';
import {Security} from './security';

export class Project {
  ID: string = "";
  name: string = "";

  version: number = 0;

  port: number = 8080;

  code: string = "";
  codeVersion: number = -1;

  security: Security = new Security();

  endPoints: IHash<EndPointReference> = {};
  dbConnection: string = "";
}

export class EndPointReference {
  key: string = "";
  value: string = "";
}
