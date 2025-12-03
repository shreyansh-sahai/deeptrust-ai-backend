
export class DomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainException';
    Object.setPrototypeOf(this, DomainException.prototype);
  }
}


export class EntityNotFoundException extends DomainException {
  constructor(entityName: string, id: string) {
    super(`${entityName} with id ${id} not found`);
    this.name = 'EntityNotFoundException';
    Object.setPrototypeOf(this, EntityNotFoundException.prototype);
  }
}


export class EntityAlreadyExistsException extends DomainException {
  constructor(entityName: string, identifier: string) {
    super(`${entityName} with ${identifier} already exists`);
    this.name = 'EntityAlreadyExistsException';
    Object.setPrototypeOf(this, EntityAlreadyExistsException.prototype);
  }
}


export class InvalidEntityException extends DomainException {
  constructor(entityName: string, reason: string) {
    super(`Invalid ${entityName}: ${reason}`);
    this.name = 'InvalidEntityException';
    Object.setPrototypeOf(this, InvalidEntityException.prototype);
  }
}
