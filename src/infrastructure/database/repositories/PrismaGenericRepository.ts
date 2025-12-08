import { IGenericRepository } from '@application/repository/IGenericRepository';

/**
 * A generic repository implementation for Prisma.
 * It requires the specific model delegate to be passed in the constructor.
 * @template T The domain entity type.
 * @template U The Prisma type for creating a new entity.
 * @template V The Prisma type for updating an existing entity.
 */
export class PrismaGenericRepository<T, U, V> implements IGenericRepository<
  T,
  U,
  V
> {
  private readonly model: any;

  constructor(model: any) {
    this.model = model;
  }

  async findById(id: string | number): Promise<T | null> {
    return this.model.findUnique({
      where: { id },
    });
  }

  async findAll(): Promise<T[]> {
    return this.model.findMany();
  }

  async create(data: U): Promise<T> {
    return this.model.create({
      data,
    });
  }

  async update(id: string | number, data: V): Promise<T> {
    return this.model.update({
      where: { id },
      data,
    });
  }

  async delete(id: string | number): Promise<void> {
    await this.model.delete({
      where: { id },
    });
  }
}
