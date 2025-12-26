export class Elemento {
  public readonly id: string;
  public readonly valor: number;
  private readonly relacionados: Set<string>;

  constructor(id: string, valor: number) {
    this.id = id;
    this.valor = valor;
    this.relacionados = new Set();
  }

  getRelacoes() {
    return Array.from(this.relacionados);
  }

  _adicionarRelacao(id: string) {
    this.relacionados.add(id);
  }
}
