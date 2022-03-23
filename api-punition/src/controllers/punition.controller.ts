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
import {Punition} from '../models';
import {PunitionRepository} from '../repositories';

export class PunitionController {
  constructor(
    @repository(PunitionRepository)
    public punitionRepository : PunitionRepository,
  ) {}

  @post('/punitions')
  @response(200, {
    description: 'Punition model instance',
    content: {'application/json': {schema: getModelSchemaRef(Punition)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Punition, {
            title: 'NewPunition',
            exclude: ['id_punition'],
          }),
        },
      },
    })
    punition: Omit<Punition, 'id_punition'>,
  ): Promise<Punition> {
    return this.punitionRepository.create(punition);
  }

  @get('/punitions/count')
  @response(200, {
    description: 'Punition model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Punition) where?: Where<Punition>,
  ): Promise<Count> {
    return this.punitionRepository.count(where);
  }

  @get('/punitions')
  @response(200, {
    description: 'Array of Punition model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Punition, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Punition) filter?: Filter<Punition>,
  ): Promise<Punition[]> {
    return this.punitionRepository.find(filter);
  }

  @patch('/punitions')
  @response(200, {
    description: 'Punition PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Punition, {partial: true}),
        },
      },
    })
    punition: Punition,
    @param.where(Punition) where?: Where<Punition>,
  ): Promise<Count> {
    return this.punitionRepository.updateAll(punition, where);
  }

  @get('/punitions/{id}')
  @response(200, {
    description: 'Punition model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Punition, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Punition, {exclude: 'where'}) filter?: FilterExcludingWhere<Punition>
  ): Promise<Punition> {
    return this.punitionRepository.findById(id, filter);
  }

  @patch('/punitions/{id}')
  @response(204, {
    description: 'Punition PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Punition, {partial: true}),
        },
      },
    })
    punition: Punition,
  ): Promise<void> {
    await this.punitionRepository.updateById(id, punition);
  }

  @put('/punitions/{id}')
  @response(204, {
    description: 'Punition PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() punition: Punition,
  ): Promise<void> {
    await this.punitionRepository.replaceById(id, punition);
  }

  @del('/punitions/{id}')
  @response(204, {
    description: 'Punition DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.punitionRepository.deleteById(id);
  }
}
