export class Model {
  ID: string = "";
  name: string = "";

  fields: Array<Field> = [];
}

export class Field {
  name: string = "";
  type: string = "";
  isModel: boolean = false;
  relationType: number = 0;
}
