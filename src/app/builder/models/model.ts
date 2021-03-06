import {CustomRelation} from './custom-relation';

export class Model {
  ID: string = "";
  name: string = "";

  fields: Array<Field> = [];
}

export class Field {
  name: string = "";
  type: FieldType = new FieldType("", "");
  relationType: CustomRelation = new CustomRelation();
}

export class FieldType {
  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }

  name: string = "";
  value: string = "";
  isCustom: boolean = false;
}

export const initialTypes =  [
  new FieldType("number [autogenerated]", "uuid.UUID"),
  new FieldType("text", "string"),
  new FieldType("number", "long"),
  new FieldType("boolean", "bool"),
];
