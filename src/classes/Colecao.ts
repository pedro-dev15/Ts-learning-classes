import { Elemento } from "./Elemento.js";
import { Validator } from "./Validator.js";

export class Colecao {
  private readonly elementos: Elemento[] = [];

  adicionar(elemento: Elemento) {
    Validator.validarElemento(elemento);
    Validator.validarDuplicados(this.elementos, elemento);

    this.elementos.push(elemento);
  }

  private buscarPorID(id: string): Elemento {
    const encontrado = this.elementos.find((e) => e.id === id);
    if (!encontrado) {
      throw new Error("Elemento não encontrado");
    }
    return encontrado;
  }

  relacionar(idOrigem: string, idDestino: string) {
    const origem = this.buscarPorID(idOrigem);
    const destino = this.buscarPorID(idDestino);

    Validator.validarRelacionamento(origem, destino);

    origem._adicionarRelacao(destino.id);
  }

  get Tamanho() {
    return this.elementos.length;
  }

  get Lista() {
    return this.elementos;
  }

  get SomaDeValores() {
    return this.elementos.reduce((acc, crr) => acc + crr.valor, 0);
  }
}
