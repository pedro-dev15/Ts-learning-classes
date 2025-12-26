import { error } from "node:console";
import { Elemento } from "./Elemento.js";

export class Validator {
  static validarElemento(elemento: Elemento) {
    if (!elemento.id) {
      throw new Error("Id não encontrado");
    }

    if (elemento.valor <= 0) {
      throw new Error("Valor deve ser positivo");
    }
  }

  static validarDuplicados(elementos: ReadonlyArray<Elemento>, novo: Elemento) {
    const existe = elementos.some((e) => e.id === novo.id);
    if (existe) {
      throw new Error("Item duplicado");
    }
  }

  static validarRelacionamento(origem: Elemento, destino: Elemento) {
    if (origem.id === destino.id) {
      throw new Error("Relacionamento com mesmo id");
    }

    if (destino.getRelacoes().includes(origem.id)) {
      throw new Error("Relacionamento circular");
    }
  }
}
