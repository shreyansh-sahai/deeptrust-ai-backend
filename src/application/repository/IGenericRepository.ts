/**
 * Represents a generic repository interface for data access operations.
 * This defines the contract that any specific repository implementation must adhere to.
 * @template T The domain entity type.
 * @template U The type for creating a new entity.
 * @template V The type for updating an existing entity.
 */
export interface IGenericRepository<T, U, V> {
  /**
   * Finds an entity by its unique identifier.
   * @param id The ID of the entity.
   * @returns A promise that resolves to the entity or null if not found.
   */
  findById(id: string | number): Promise<T | null>;

  /**
   * Retrieves all entities.
   * @returns A promise that resolves to an array of entities.
   */
  findAll(): Promise<T[]>;

  /**
   * Creates a new entity.
   * @param data The data for the new entity.
   * @returns A promise that resolves to the created entity.
   */
  create(data: U): Promise<T>;

  /**
   * Updates an existing entity by its ID.
   * @param id The ID of the entity to update.
   * @param data The data to update the entity with.
   * @returns A promise that resolves to the updated entity.
   */
  update(id: string | number, data: V): Promise<T>;

  /**
   * Deletes an entity by its ID.
   * @param id The ID of the entity to delete.
   * @returns A promise that resolves when the operation is complete.
   */
  delete(id: string | number): Promise<void>;
}
