export interface IDao<T> {
  findAll(): Promise<T[]>;
  // findOne(id: string): T;
  // insert(entity: T): T;
  // delete(id: string): void;
  // update(entity: T): T;
}
