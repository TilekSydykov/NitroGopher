import {DBConnection} from './DBConnection';

export class Project {
  ID: number = 0;
  name: string = "";

  endPoints: Array<number> = [];
  dbConnection: number = 0;
}
