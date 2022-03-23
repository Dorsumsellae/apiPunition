import {Entity, model, property} from '@loopback/repository';

@model()
export class Punition extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_punition?: number;

  @property({
    type: 'string',
  })
  type_punition?: string;


  constructor(data?: Partial<Punition>) {
    super(data);
  }
}

export interface PunitionRelations {
  // describe navigational properties here
}

export type PunitionWithRelations = Punition & PunitionRelations;
