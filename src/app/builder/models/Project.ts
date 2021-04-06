import {EndPoint} from './EndPoint';
import {DBConnection} from './DBConnection';

export class Project {
  ID: number = 0;
  Name: string = "";

  EndPoints: Array<EndPoint> = [];
  DbConnection: DBConnection = new DBConnection();
}
