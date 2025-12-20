export class Elemento {
  constructor(
    private readonly id: number,
    private readonly name: String,
    private readonly valor: Number
  ) {}

  getId(): Number {
    return this.id;
  }
  getName(): String {
    return this.name;
  }
  getValor(): Number {
    return this.valor;
  }
}
