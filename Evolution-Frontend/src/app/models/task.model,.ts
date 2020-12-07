
export class Task {
    constructor(
      public nameTask: string,
      public priority: string,
      public expirationDate: Date,
      public tid?: string,
    ) {}
}
