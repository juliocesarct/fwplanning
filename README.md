# Fwplanning

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.12.

# Fluxo do app

## 1. Rota inicial "/"
  
  Página de criação de uma nova sessão onde o usuário deve informar seu nome e nome da sessão.

## 2. Rota da sessão "/session/id"
  
  ### 2.1 Criador da sessão
  Página da sessão, contendo a lista das tarefas que serão refinadas e o botão de adicionar nova tarefa.
  O botão de adicionar tarefa abre uma modal para inclusão de novas tarefas.
  As tarefas já cadatradas possuem o botão "Refinar" que irá direcionar para sala de votação.

  ### 2.2 Participante
  Os participantes que receberem o link já com id de uma sessão porém ainda não tiverem o usuário/nome registrado em local storage, serão direcionados para inicial onde é definido usuário, porém o campo sessão será ocultado.

  Participantes com usuário devidamente registrado, serão direcionados para rota de sala de votação /VotingRoom/id

## 3. Rota de votação /VotingRoom/id
  Quando o usuário criador da sessão utilizar o botão "Refinar" da tarefa, o identificador da tarefa e sua descrição irão aparecer para todos os participantes.
  

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
