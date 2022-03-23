import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Distribution} from '../models';
import {DistributionRepository} from '../repositories';

export class DistributionController {
  constructor(
    @repository(DistributionRepository)
    public distributionRepository : DistributionRepository,
  ) {}

  @post('/distributions')
  @response(200, {
    description: 'Distribution model instance',
    content: {'application/json': {schema: getModelSchemaRef(Distribution)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Distribution, {
            title: 'NewDistribution',
            exclude: ['id_distribution'],
          }),
        },
      },
    })
    distribution: Omit<Distribution, 'id_distribution'>,
  ): Promise<Distribution> {
    return this.distributionRepository.create(distribution);
  }

  @get('/distributions/count')
  @response(200, {
    description: 'Distribution model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Distribution) where?: Where<Distribution>,
  ): Promise<Count> {
    return this.distributionRepository.count(where);
  }

  @get('/distributions')
  @response(200, {
    description: 'Array of Distribution model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Distribution, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Distribution) filter?: Filter<Distribution>,
  ): Promise<Distribution[]> {
    return this.distributionRepository.find(filter);
  }

  @patch('/distributions')
  @response(200, {
    description: 'Distribution PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Distribution, {partial: true}),
        },
      },
    })
    distribution: Distribution,
    @param.where(Distribution) where?: Where<Distribution>,
  ): Promise<Count> {
    return this.distributionRepository.updateAll(distribution, where);
  }

  @get('/distributions/{id}')
  @response(200, {
    description: 'Distribution model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Distribution, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Distribution, {exclude: 'where'}) filter?: FilterExcludingWhere<Distribution>
  ): Promise<Distribution> {
    return this.distributionRepository.findById(id, filter);
  }

  @patch('/distributions/{id}')
  @response(204, {
    description: 'Distribution PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Distribution, {partial: true}),
        },
      },
    })
    distribution: Distribution,
  ): Promise<void> {
    await this.distributionRepository.updateById(id, distribution);
  }

  @put('/distributions/{id}')
  @response(204, {
    description: 'Distribution PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() distribution: Distribution,
  ): Promise<void> {
    await this.distributionRepository.replaceById(id, distribution);
  }

  @del('/distributions/{id}')
  @response(204, {
    description: 'Distribution DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.distributionRepository.deleteById(id);
  }
}
