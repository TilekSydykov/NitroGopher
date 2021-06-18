export class CustomRelation {
  name: string = "";
  goPhrase: string = "";
  relation: RelationsEnum = RelationsEnum.ONE_TO_MANY;
}

export enum RelationsEnum {
  ONE_TO_MANY = 'oneToMany',
  MANY_TO_ONE = 'manyToOne',
  ONE_TO_ONE = 'oneToOne',
  MANY_TO_MANY = 'manyToMany'
}
