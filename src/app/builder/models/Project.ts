import {DBConnection} from './DBConnection';
import {IHash} from '../../services/storage/storage.service';

export class Project {
  ID: string = "";
  name: string = "";

  endPoints: IHash<EndPointReference> = {};
  dbConnection: string = "";
}

export class EndPointReference {
  key: string = "";
  value: string = "";
}
