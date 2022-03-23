import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MariaDbDataSource} from '../datasources';
import {Punition, PunitionRelations} from '../models';

export class PunitionRepository extends DefaultCrudRepository<
  Punition,
  typeof Punition.prototype.id_punition,
  PunitionRelations
> {
  constructor(
    @inject('datasources.mariaDB') dataSource: MariaDbDataSource,
  ) {
    super(Punition, dataSource);
  }
}
