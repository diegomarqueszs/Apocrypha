<p align="center">
    <img src="https://user-images.githubusercontent.com/90580148/215624958-ca5b593c-6172-4201-a583-77ba2aab5295.png" alt="logo" width="300" height="300">
</p>

<h3 align="center">Apocrypha - Gerenciamento de Bibliotecas </h3>

<p align="center">
  GCC188 - Engenharia de Software 
</p>
    
## Membros do grupo:
- DIEGO DE SOUZA MARQUES **202111037** *(diego.marques1@estudante.ufla.br)*
- RICARDO AUGUSTO SANTOS **202110173** *(ricardo.santos3@estudante.ufla.br)*
- THIAGO HENRIQUE DOS REIS MAGALHÃES **202110174** *(thiago.magalhaes3@estudante.ufla.br)*

## Visão geral do sistema:
A cidade `Brasiléia, Acre`, recebeu apoio para construir uma nova biblioteca na cidade. No entanto, todo o gerenciamento de livros, empréstimos, clientes e funcionários, `ainda são feitos com papel e caneta` nas outras bibliotecas da cidade. Nessa biblioteca a cidade gostaria de fazer diferente, pois há uma enorme dificuldade de "navegar" entre os arquivos físicos das bibliotecas, além do desperdício de papel e espaço. Diante disso, a empresa `Data Science Eyes` foi contratada para desenvolver um software que auxilie no gerenciamento da biblioteca. 
O sistema fará o controle de todos os clientes, funcionários, livros e empréstimos.

### Principais funcionalidades:
    - Os funcionários devem ser capazes de realizar login no sistema.
    - O sistema deve ser capaz de cadastrar, consultar, atualizar, remover livros
    - O sistema deve ser capaz de cadastrar, consultar, atualizar, remover clientes
    - O sistema deve ser capaz de cadastrar, consultar, atualizar, remover funcionários
    - O sistema deve ser capaz de realizar, buscar, atualizar, remover empréstimos
    
### Usuários:
    - Funcionários 
    - Administrador
## Estrutura de diretório
    - Apocrypha
        - Padrões Adotados
        - Requisitos
        - Server
            - View
            - Routes
            - Services
            - Controllers
                - __test__
            - teste
            - Persistence
            - Model
                - Astah
                - Diagramas
                    - Diagramas de Sequencia
                    - Implementação do Sistema
                    - Diagrama de Classes
                    - Diagrama de pacote
            - Node_modules
        
## Tecnologias Utilizadas:
- HTML 5 
- CSS 3 
- NodeJS
- PostgreSQL 15.0
- Apache 2.4.52
- Insomnia 2022.7.5
- Embedded JavaScript

## Regras do uso do Git
### Commits:
- Commits devem representar mudanças pequenas no sistema, evitando que as mudanças fiquem muito grandes e difíceis de serem revertidas.
- Commits devem possuir mensagens claras e descritivas, deve evitar descrições genéricas como: "Correções" ou "Alterações", e indicar o que foi alterado "Correções Create tabela Empréstimo".
- Commits devem apresentar data de realização no começo da mensagem.
- Commits devem possuir verbos de ação no presente.
- Commits desncessários devem ser evitados.
### Branches:
- Mudanças maiores no sistema, devem ser realizadas em branches separadas para facilitar a revisão.
- Nomes de branches devem ser descritivas
- Caso uma branche já foi mesclada ou fique obsoleta, deve ser deletada
- Antes do marge com branche principal, deve ser acordado com todos da equipe, garantindo que todos estão de acordo com as novas alterações.
### Tags:
- Tags devem ser utilizadas para marcar versões consistentes do sistema.
- Tags devem manter padrão de nomenclatura de versão adotada, exemplo V.0. V.1, V.2
### Organização de pastas:
- O sistema deve ser divido em:
    - Rotas
    - Views
    - Controllers 
    - Services
- O código deve ser separado para que exerça apenas a função da pasta que esta alocado.

