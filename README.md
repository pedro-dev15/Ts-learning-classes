# 🧠 Coleção Imutável em TypeScript  
### Arquitetura orientada a integridade, imutabilidade e contratos de leitura

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![OOP](https://img.shields.io/badge/Paradigma-OOP-blue)]()
[![Immutability](https://img.shields.io/badge/Design-Imutabilidade-success)]()
[![Architecture](https://img.shields.io/badge/Focus-Arquitetura%20de%20Software-important)]()

---

## Índice

- [Descrição](#descrição)
- [Objetivo do Projeto](#objetivo-do-projeto)
- [Conceitos Aplicados](#conceitos-aplicados)
- [Arquitetura](#arquitetura)
- [Regras do Domínio](#regras-do-domínio)
- [Contratos de Leitura](#contratos-de-leitura)
- [Como Executar](#como-executar)
- [Colaboradores](#colaboradores)

---

## Descrição

Projeto educacional desenvolvido em **TypeScript** com foco em **arquitetura de software**, **imutabilidade**, **encapsulamento** e **programação defensiva**.

O sistema gerencia uma **coleção de elementos imutáveis**, permitindo apenas operações controladas e validadas, garantindo que o estado do sistema **nunca se torne inconsistente**.

> ⚠️ Este projeto **não é** uma API REST, **não usa banco de dados** e **não possui interface gráfica**.  
O objetivo é **design correto**, não infraestrutura.

---

## Objetivo do Projeto

Treinar conceitos fundamentais de engenharia de software:

- Pensamento arquitetural
- Uso correto do sistema de tipos do TypeScript
- Controle rigoroso de estado
- Separação clara de responsabilidades
- Criação de invariantes explícitas

Este projeto **não busca ser simples**, busca ser **correto e previsível**.

---

## Conceitos Aplicados

- Imutabilidade interna e externa
- Encapsulamento forte
- `ReadonlyArray` como barreira de segurança
- Classes com responsabilidade única
- Getters como contratos de leitura
- Programação defensiva
- Validação centralizada
- Invariantes explícitas de domínio

---

## Arquitetura

A arquitetura é dividida em três papéis bem definidos:

### 📦 Coleção
Responsável por:
- Gerenciar todos os elementos
- Controlar adições
- Autorizar relacionamentos
- Garantir que invariantes nunca sejam quebradas

É a **única autoridade sobre o estado do sistema**.

---

### 🧩 Elemento
Responsável por:
- Representar um item individual
- Manter propriedades imutáveis
- Armazenar relacionamentos aprovados

Não valida regras de negócio e **não pode ser modificado externamente**.

---

### 🛡️ Validador
Responsável por:
- Verificar se operações são válidas
- Garantir integridade antes de qualquer modificação

Não mantém estado e **não altera dados**.

---

## Regras do Domínio

O sistema **NUNCA permite**:

- Elementos duplicados
- Elementos com dados inválidos
- Relacionamentos circulares
- Relacionamentos com o próprio elemento
- Exposição de estruturas internas mutáveis
- Estados intermediários inconsistentes

Qualquer operação que viole essas regras é **rejeitada imediatamente**.

---

## Contratos de Leitura

O sistema permite apenas:

- Leitura da quantidade de elementos
- Leitura da coleção via `ReadonlyArray`
- Consulta de propriedades individuais
- Acesso a dados derivados via getters

> Nenhuma modificação direta é possível fora da classe de coleção.

---

## Como Executar

1. **Clone o repositório**
```bash
git clone <URL_DO_REPOSITORIO>
cd colecao-imutavel-ts
```
2. **Instale as dependências:**

```bash
npm install
```

2. **Execute o projeto**

```bash
npm run dev
```

## Colaboradores

- **Pedro Da Cunha** – Desenvolvedor principal
  <br></br>
  [![Pedro Da Cunha](https://github.com/pedro-dev15.png?size=100)](https://github.com/pedro-dev15)
