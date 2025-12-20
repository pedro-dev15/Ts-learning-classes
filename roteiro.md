# Arquitetura Pedagógica - Projeto TypeScript

## 1️⃣ PROBLEMA BEM DEFINIDO

### O que o sistema faz:

O sistema gerencia uma coleção de elementos que possuem características específicas e relacionamentos entre si. Ele permite:

- Adicionar novos elementos à coleção
- Consultar informações sobre elementos existentes
- Estabelecer relações entre elementos
- Validar a integridade da coleção como um todo

### O que o sistema NÃO faz:

- Não permite modificação direta dos elementos após sua criação
- Não expõe a estrutura interna da coleção para modificação externa
- Não aceita estados inconsistentes ou inválidos
- Não permite acesso não controlado aos dados internos

### Delimitação do domínio:

O sistema trabalha com uma coleção finita de elementos onde:

- Cada elemento possui características próprias que não mudam após criação
- Existem regras de relacionamento entre elementos que devem ser respeitadas
- A coleção como um todo possui propriedades derivadas que dependem de seus elementos
- Operações de consulta são permitidas, mas modificações seguem regras específicas

### Limites do projeto:

- Não é um sistema de persistência (dados existem apenas em memória)
- Não possui interface de usuário
- Não gerencia múltiplas coleções simultaneamente
- Não implementa operações de busca complexa ou filtragem avançada

---

## 2️⃣ PAPÉIS DAS CLASSES (SEM IMPLEMENTAÇÃO)

### Classe Principal de Coleção

**Responsabilidade:** Gerenciar a coleção completa de elementos e garantir sua integridade.

**O que ela faz:**

- Mantém a coleção interna de elementos
- Controla a adição de novos elementos
- Expõe informações sobre a coleção de forma controlada
- Garante que regras de integridade sejam sempre respeitadas

**O que ela NÃO faz:**

- Não permite acesso direto à coleção interna para modificação
- Não expõe métodos que permitam alterar elementos existentes
- Não delega validação para código externo

### Classe de Elemento Individual

**Responsabilidade:** Representar um único elemento da coleção com suas características imutáveis.

**O que ela faz:**

- Armazena as características próprias do elemento
- Permite consulta de suas propriedades
- Mantém informações sobre relacionamentos com outros elementos

**O que ela NÃO faz:**

- Não permite alteração de suas características após criação
- Não expõe métodos de modificação
- Não valida a si mesmo (validação é responsabilidade da coleção)

### Classe de Validação/Integridade

**Responsabilidade:** Verificar se operações e estados são válidos antes de serem aceitos.

**O que ela faz:**

- Valida novos elementos antes de serem adicionados
- Verifica se relacionamentos propostos são válidos
- Garante que invariantes do sistema sejam respeitadas

**O que ela NÃO faz:**

- Não modifica dados diretamente
- Não toma decisões sobre o que fazer quando validação falha (apenas indica)
- Não mantém estado próprio sobre a coleção

---

## 3️⃣ REGRAS DE IMUTABILIDADE

### Dados que NUNCA mudam após criação:

**Características dos elementos individuais:**

- Uma vez criado, um elemento não pode ter suas características fundamentais alteradas
- Razão: Garantir consistência histórica e evitar estados inconsistentes
- Se uma característica precisa mudar, um novo elemento deve ser criado

**Estrutura da coleção interna:**

- A coleção interna não pode ser substituída ou reatribuída após inicialização
- Razão: Manter referências estáveis e garantir que validações sempre operem sobre a mesma estrutura
- Novos elementos são adicionados à coleção existente, não criando uma nova coleção

**Relacionamentos estabelecidos:**

- Uma vez estabelecido um relacionamento entre elementos, ele não pode ser desfeito ou modificado
- Razão: Manter integridade referencial e evitar estados inválidos

### Dados internos vs dados expostos:

**Dados internos (protegidos com readonly):**

- A coleção interna deve ser protegida contra modificação acidental dentro da própria classe
- Mesmo dentro da classe, a coleção não deve ser reatribuída
- Propriedades que representam estado crítico devem ser readonly internamente

**Dados expostos (ReadonlyArray como barreira):**

- Quando a coleção precisa ser consultada externamente, deve ser exposta como ReadonlyArray
- Isso cria uma barreira que impede modificação mesmo que alguém tente fazer cast ou manipulação
- Qualquer tentativa de modificar a coleção exposta deve resultar em erro de compilação

**Dados calculados (getters):**

- Informações derivadas da coleção devem ser calculadas dinamicamente via getters
- Esses valores não devem ser armazenados em variáveis mutáveis
- Cada acesso recalcula baseado no estado atual da coleção

---

## 4️⃣ CONTRATOS DE LEITURA

### Informações que podem ser lidas externamente:

**Tamanho da coleção:**

- Quantidade total de elementos na coleção
- Justificativa: Informação básica e segura que não expõe dados sensíveis

**Lista de elementos (ReadonlyArray):**

- Acesso à coleção completa, mas apenas para leitura
- Justificativa: Permite iteração e consulta sem risco de modificação acidental
- Uso de ReadonlyArray garante que mesmo tentativas de modificação via métodos de array falhem em tempo de compilação

**Propriedades agregadas:**

- Informações calculadas sobre a coleção como um todo (ex: soma, média, contagem de tipos específicos)
- Justificativa: Dados derivados que não expõem estrutura interna diretamente
- Devem ser expostos via getters para garantir cálculo sempre atualizado

**Características individuais de elementos:**

- Propriedades específicas de um elemento quando acessado através da coleção
- Justificativa: Consulta pontual sem expor o elemento completo para modificação

### Por que acesso somente leitura:

**Segurança de integridade:**

- Previne modificações acidentais que quebrariam invariantes
- Garante que validações feitas na adição sejam sempre respeitadas

**Controle de estado:**

- Todas as modificações passam por pontos de controle definidos
- Facilita rastreamento de mudanças e debugging

**Encapsulamento:**

- Mantém a responsabilidade de modificação dentro da classe
- Código externo não precisa conhecer regras internas de validação

---

## 5️⃣ INVARIANTES E ESTADOS INVÁLIDOS

### Condições que NUNCA podem existir:

**Coleção com elementos duplicados:**

- Dois elementos idênticos não podem coexistir na coleção
- Quando bloqueado: Na tentativa de adição de novo elemento
- Por quê: Quebraria a unicidade e poderia causar ambiguidade em consultas

**Relacionamentos circulares:**

- Um elemento não pode estar relacionado consigo mesmo diretamente ou indiretamente
- Quando bloqueado: Na tentativa de estabelecer relacionamento
- Por quê: Criaria loops infinitos em operações de navegação

**Coleção vazia em estado inválido:**

- Se a coleção possui elementos, ela não pode estar simultaneamente vazia
- Quando bloqueado: Em qualquer operação que modifique o estado interno
- Por quê: Inconsistência lógica que quebraria propriedades derivadas

**Elementos com características inválidas:**

- Elementos não podem ter valores que violem regras de domínio (ex: negativos onde só positivos são permitidos)
- Quando bloqueado: Na criação do elemento e na adição à coleção
- Por quê: Dados inválidos corromperiam cálculos e relacionamentos

**Coleção exposta mutável:**

- A coleção nunca deve ser exposta de forma que permita modificação externa
- Quando bloqueado: Em qualquer método que retorne a coleção
- Por quê: Quebraria o encapsulamento e permitiria bypass de validações

**Estado inconsistente após operação:**

- Após qualquer operação, a coleção deve estar em estado válido e consistente
- Quando bloqueado: No final de cada método que modifica estado
- Por quê: Garante que o objeto nunca fica em estado parcial ou corrompido

### Programação defensiva como regra:

**Validação em todas as entradas:**

- Todo método público que recebe parâmetros deve validá-los antes de usar
- Não assumir que código externo sempre passará dados válidos
- Rejeitar operações inválidas de forma clara e imediata

**Proteção contra estados intermediários:**

- Operações que modificam múltiplas partes devem garantir atomicidade
- Se uma parte falhar, o estado deve permanecer inalterado
- Nunca deixar o objeto em estado parcialmente modificado

**Verificação de invariantes:**

- Após operações críticas, verificar se invariantes ainda são respeitadas
- Se uma invariante for violada, a operação deve ser revertida ou rejeitada
- Nunca aceitar um estado que viole regras fundamentais do domínio

---

## 6️⃣ CRITÉRIOS DE SUCESSO

### Como saber se cada conceito foi aplicado corretamente:

### Arrays tipados via generics:

**✅ Uso correto:**

- A coleção interna usa generics para especificar o tipo de elemento que contém
- O tipo genérico é usado consistentemente em toda a classe
- Métodos que trabalham com a coleção respeitam o tipo genérico

**❌ Uso incorreto (mesmo que funcione):**

- Usar `any[]` ou tipos não genéricos para a coleção
- Ignorar o tipo genérico em métodos auxiliares
- Fazer casts que ignoram o sistema de tipos

### ReadonlyArray como barreira externa:

**✅ Uso correto:**

- Qualquer método que retorna a coleção retorna `ReadonlyArray<T>`
- Tentativas de modificar o array retornado geram erro de compilação
- A barreira é mantida mesmo em cenários de herança ou composição

**❌ Uso incorreto (mesmo que funcione):**

- Retornar `Array<T>` diretamente
- Fazer cast para `Array` para "facilitar" o uso
- Criar métodos auxiliares que retornam array mutável

### readonly como proteção interna:

**✅ Uso correto:**

- Propriedades que representam a coleção interna são marcadas como `readonly`
- Propriedades que não devem ser reatribuídas são `readonly`
- O modificador `readonly` é usado consistentemente onde apropriado

**❌ Uso incorreto (mesmo que funcione):**

- Usar `readonly` apenas em propriedades expostas, ignorando proteção interna
- Reatribuir propriedades `readonly` através de truques ou workarounds
- Marcar tudo como `readonly` sem entender o propósito

### Getters como contrato de leitura:

**✅ Uso correto:**

- Informações derivadas são expostas exclusivamente via getters
- Getters calculam valores dinamicamente baseados no estado atual
- Não há variáveis mutáveis que armazenam valores que deveriam ser calculados

**❌ Uso incorreto (mesmo que funcione):**

- Armazenar valores calculados em propriedades mutáveis
- Usar métodos normais quando getters seriam mais apropriados
- Fazer getters que modificam estado interno

### Programação defensiva como regra:

**✅ Uso correto:**

- Todo método público valida seus parâmetros antes de usar
- Operações que podem falhar verificam pré-condições
- Estados inválidos são detectados e rejeitados imediatamente
- Não há "casos especiais" onde validação é pulada

**❌ Uso incorreto (mesmo que funcione):**

- Validar apenas "quando lembrado" ou em casos "óbvios"
- Assumir que código externo sempre passa dados válidos
- Aceitar estados inválidos e "corrigir" depois
- Usar try-catch como substituto de validação prévia

### O que caracteriza uso errado mesmo que "funcione":

**Bypass de proteções:**

- Se é possível modificar dados que deveriam ser imutáveis através de qualquer meio
- Se validações podem ser ignoradas através de métodos alternativos
- Se o sistema de tipos permite operações que deveriam ser bloqueadas

**Inconsistência conceitual:**

- Se alguns métodos seguem os princípios mas outros não
- Se a proteção existe mas pode ser facilmente contornada
- Se o código funciona mas viola os princípios estabelecidos

**Falta de barreiras:**

- Se dados internos podem ser acessados diretamente sem controle
- Se modificações podem acontecer sem passar por validação
- Se o estado pode ficar inconsistente entre operações

---

## 🧠 DECISÕES ESTRUTURAIS - POR QUÊ?

### Por que ReadonlyArray e não apenas readonly Array?

ReadonlyArray cria uma barreira de tipo mais forte. Mesmo que alguém tente fazer cast ou manipulação, o TypeScript impedirá operações de modificação. É uma proteção em múltiplas camadas: sintática, de tipo e semântica.

### Por que getters e não propriedades calculadas?

Getters garantem que valores sempre refletem o estado atual. Se a coleção muda, os valores calculados mudam automaticamente. Propriedades armazenadas podem ficar desatualizadas e requerem sincronização manual, aumentando complexidade e risco de bugs.

### Por que validação em todas as entradas?

Código defensivo assume que entradas podem ser inválidas. Validar apenas "quando necessário" cria pontos de falha. Validação consistente torna o código previsível e confiável, mesmo quando usado incorretamente.

### Por que imutabilidade interna e externa?

Imutabilidade em múltiplas camadas cria redundância de segurança. Se uma camada falhar, outras ainda protegem. Além disso, torna o código mais fácil de raciocinar: dados não mudam inesperadamente em nenhum nível.

### Por que invariantes explícitas?

Invariantes são as "leis físicas" do seu sistema. Se violadas, o sistema deixa de fazer sentido. Verificá-las explicitamente torna bugs visíveis imediatamente, em vez de se manifestarem como comportamentos estranhos mais tarde.

---

## 🎯 OBJETIVO FINAL

Esta arquitetura fornece uma base clara onde:

- Cada conceito tem um propósito definido e justificado
- As regras são explícitas e não ambíguas
- O sistema de tipos trabalha a favor da segurança, não contra ela
- A implementação segue naturalmente da estrutura conceitual

A implementação final é responsabilidade exclusiva do aluno, mas esta base garante que ela será feita sobre fundamentos sólidos e pedagogicamente corretos.
