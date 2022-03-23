import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MariaDbDataSource} from '../datasources';
import {Distribution, DistributionRelations} from '../models';

export class DistributionRepository extends DefaultCrudRepository<
  Distribution,
  typeof Distribution.prototype.id_distribution,
  DistributionRelations
> {
  constructor(
    @inject('datasources.mariaDB') dataSource: MariaDbDataSource,
  ) {
    super(Distribution, dataSource);
  }
}
