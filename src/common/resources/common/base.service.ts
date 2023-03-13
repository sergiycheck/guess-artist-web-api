import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class EntityService<
  TClassDocument,
  TCreateClassEntityDto,
  TUpdateClassEntityDto extends { id: string },
> {
  constructor(
    /**@InjectModel(Model.name) in inherited constructor*/
    public model: Model<TClassDocument>,
  ) {}

  protected async create(createEntityDto: TCreateClassEntityDto) {
    const entity = new this.model({
      ...createEntityDto,
    });
    const newEntity = await entity.save();

    return newEntity;
  }

  protected async findAll() {
    const count = await this.model.count({}).exec();
    const docs = await this.model.find({}).exec();
    return { count, docs };
  }

  protected async findOne(id: string) {
    const entity = await this.model.findById(id).exec();
    return entity;
  }

  public async exists(id: string) {
    const exists = await this.model.exists({ _id: id });
    if (!exists)
      throw new NotFoundException(`entity with id ${id} doesn't exist `);

    return true;
  }

  protected async update(id: string, updateEntityDto: TUpdateClassEntityDto) {
    await this.exists(id);

    const { id: idDto, ...updateData } = updateEntityDto;
    const updateEntity = await this.model.findOneAndUpdate(
      { _id: idDto },
      { ...updateData },
      { runValidators: true, new: true },
    );

    return updateEntity;
  }

  public remove(id: string) {
    return this.model.deleteOne({ _id: id }) as unknown as {
      deletedCount: number;
    };
  }
}
