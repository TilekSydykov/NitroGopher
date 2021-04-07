import {DBConnection} from './DBConnection';

export class Project {
  ID: string = "";
  name: string = "";

  endPoints: Array<string> = [];
  dbConnection: string = "";
}
