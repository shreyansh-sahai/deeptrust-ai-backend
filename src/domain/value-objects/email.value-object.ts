
export class Email {
  private readonly value: string;

  constructor(email: string) {
    this.value = email;
    this.validate();
  }


  private validate(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!this.value || this.value.trim().length === 0) {
      throw new Error('Email cannot be empty');
    }

    if (!emailRegex.test(this.value)) {
      throw new Error('Invalid email format');
    }

    if (this.value.length > 255) {
      throw new Error('Email cannot exceed 255 characters');
    }
  }


  public getValue(): string {
    return this.value;
  }


  public equals(other: Email): boolean {
    return this.value.toLowerCase() === other.value.toLowerCase();
  }


  public toString(): string {
    return this.value;
  }
}
