import {Entity, model, property} from '@loopback/repository';

@model()
export class Distribution extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_distribution?: number;

  @property({
    type: 'number',
    required: true,
  })
  id_stagiaire: number;

  @property({
    type: 'number',
    required: true,
  })
  id_punition: number;

  @property({
    type: 'date',
    required: true,
  })
  jour: string;

  @property({
    type: 'string',
    required: true,
  })
  lieu: string;


  constructor(data?: Partial<Distribution>) {
    super(data);
  }
}

export interface DistributionRelations {
  // describe navigational properties here
}

export type DistributionWithRelations = Distribution & DistributionRelations;
