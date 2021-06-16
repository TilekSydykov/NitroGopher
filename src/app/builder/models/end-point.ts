import {Model} from './model';

class Role {
}

export class EndPoint {
  ID: string = "";
  name: string = "";

  isCrud: boolean = false;
  crudType: CrudType = CrudType.READ;
  crudModel: Model = new Model();
  crudModelToClient: Model = new Model();

  loginEnabled: boolean = false;
  userRoles: Array<Role> = [];

}

export enum CrudType {
  READ,
  CREATE,
  UPDATE,
  DELETE
}
