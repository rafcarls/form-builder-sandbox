# formBuilder Sandbox

Ambiente de desenvolvimento para criação, teste e exportação de campos customizados baseados na lib [formBuilder](https://formbuilder.online/).

## Sumário

- [Sobre](#sobre)
- [Estrutura](#estrutura)
- [Como adicionar um campo customizado](#como-adicionar-um-campo-customizado)
- [Como adicionar um conjunto de campos customizado](#como-adicionar-um-conjunto-de-campos-customizado)
- [Campos disponíveis](#campos-disponíveis)
- [Sobre os valores dos campos](#sobre-os-valores-dos-campos)
- [Estruturas complementares](#estruturas-complementares)
- [Persistência do formulário](#persistência-do-formulário)
- [Dependências](#dependências)
- [Instalação](#instalação)

## Sobre

Este projeto é uma versão revisada do sandbox utilizado para criar e testar os campos customizados do gerador de formulários dinâmicos do **Requerimento Digital da Prefeitura de Praia Grande**. O objetivo é prototipar novos campos — com máscaras, validações e comportamentos específicos — e exportar seus códigos. A principal evolução em relação ao anterior é a modularização dos scripts, que antes eram dois **god files**, um para o **builder** e outro para o **render**.

## Estrutura

```
assets/
├── css/
│   └── styles.css              # estilos globais para campos, builder e render
├── data/
│   └── cbo.json                # dados da Classificação Brasileira de Ocupações (CBO)
├── demo/
│   └── formData.json           # dados de exemplo para pré-carregar o render
└── js/
    ├── builder.js              # entry point do builder
    ├── render.js               # entry point do render
    ├── config.js               # configurações da lib formBuilder
    └── helpers/
        ├── constants.js        # constantes e tipos de campos customizados
        ├── dom.js              # manipulação de DOM (ex: reordenação da sidebar)
        ├── fieldBehavior.js    # comportamentos dos campos (máscara, validação e eventos)
        ├── fieldMap.js         # mapeamento e agrupamento de campos (ex: Input Sets)
        ├── mask.js             # funções de máscara
        ├── utils.js            # utilitários gerais e busca de dados
        └── validation.js       # funções de validação
pages/
├── builder.html                # editor visual de formulários
└── render.html                 # renderiza o formulário a partir do `assets/demo/formData.json`
```

## Como adicionar um campo customizado

1. Defina o tipo em `helpers/constants.js` dentro de `CUSTOM_FIELD_TYPE`:

    ```js
    meuCampo: {
        label: "Meu Campo",
        class: "fb-field-meu-campo",
        icon: '<i class="bi bi-icon-name"></i>',
    }
    ```

2. Adicione o label na lista `itemLabelOrder` dentro de `reorderSidebarItems` em `helpers/dom.js`, na posição desejada:

    ```js
    const itemLabelOrder = [
        // ... campos existentes
        CUSTOM_FIELD_TYPE.meuCampo.label,
    ];
    ```

3. Adicione o campo na lista `fields` em `config.js`:

    ```js
    {
        type: "text",
        label: CUSTOM_FIELD_TYPE.meuCampo.label,
        className: `form-control ${CUSTOM_FIELD_TYPE.meuCampo.class}`,
        icon: CUSTOM_FIELD_TYPE.meuCampo.icon,
    }
    ```

4. Adicione a máscara em `helpers/mask.js` (se necessário):

    ```js
    export function maskMeuCampo(value) { ... }
    ```

5. Adicione a validação em `helpers/validation.js` (se necessário):

    ```js
    export function isValidMeuCampo(value) { ... }
    ```

6. Registre o comportamento em `helpers/fieldBehavior.js`:

    ```js
    [CUSTOM_FIELD_TYPE.meuCampo.class]: {
        mask: mask.maskMeuCampo, // ou null
        validate: validation.isValidMeuCampo, // ou null
    }
    ```

## Como adicionar um conjunto de campos customizado

1.  Defina o conjunto em `helpers/constants.js` dentro de `CUSTOM_INPUT_SETS`:

    ```js
    meuConjunto: {
        label: "Meu Conjunto",
        class: "fb-input-set-meu-conjunto",
        icon: '<i class="bi bi-icon-name"></i>',
    }
    ```

2.  Adicione a entrada em `config.js` dentro de `inputSets`:

    ```js
    {
        label: CUSTOM_INPUT_SETS.meuConjunto.label,
        icon: CUSTOM_INPUT_SETS.meuConjunto.icon,
        fields: [
            {
                type: "text",
                label: "Campo 1",
                className: `form-control ${CUSTOM_INPUT_SETS.meuConjunto.class} fb-field-campo1`,
            },
            // ...
        ],
    }
    ```

3.  Crie a função de mapeamento em `helpers/fieldMap.js` e registre-a em `onFieldAdded` dentro de `helpers/fieldBehavior.js`:

    ```js
    // fieldMap.js
    export function mapMeuConjuntoFieldGroup(fieldId, fieldData) { ... }

    // fieldBehavior.js
    export function onFieldAdded(fieldId, fieldData) {
        mapCepFieldGroup(fieldId, fieldData);
        mapMeuConjuntoFieldGroup(fieldId, fieldData);
    }
    ```

## Campos disponíveis

### Campos customizados

| Campo     | Máscara | Validação | Descrição                                                              |
| :-------- | :-----: | :-------: | :--------------------------------------------------------------------- |
| CPF       |   Sim   |    Sim    | Digite o CPF                                                           |
| CNH       |   Sim   |    Sim    | Informe o número da sua CNH                                            |
| PIS/PASEP |   Sim   |    Sim    | Informe o número do PIS/PASEP                                          |
| CNPJ      |   Sim   |    Sim    | Digite o CNPJ da empresa                                               |
| CNO       |   Sim   |    Sim    | Informe o número do cadastro nacional de obras (CNO)                   |
| CNJ       |   Sim   |    Sim    | Informe o número da certidão (nascimento, casamento ou óbito)          |
| Telefone  |   Sim   |    Sim    | Digite o telefone com DDD                                              |
| Celular   |   Sim   |    Sim    | Digite o celular com DDD                                               |
| E-mail    |   Não   |    Sim    | Digite uma e-mail válido                                               |
| CEP       |   Sim   |    Sim    | Informe o CEP                                                          |
| Data      |   Sim   |    Sim    | Digite uma data válida                                                 |
| Hora      |   Sim   |    Sim    | Informe o horário                                                      |
| BRL       |   Sim   |    Não    | Digite o valor em reais                                                |
| IPTU      |   Sim   |    Sim    | Informe o número do cadastro do imóvel (IPTU)                          |
| CBO       |   Não   |    Não    | Selecione a ocupação via datalist (CBO)                                |
| Hiperlink |   Não   |    Não    | Insira uma URL válida — o campo abre o link em nova aba ao ser clicado |

### Conjunto de campos customizado

| Conjunto        | Campos                                                   |
| :-------------- | :------------------------------------------------------- |
| Conjunto de CEP | CEP, Logradouro, Número, Bairro, Cidade, UF, Complemento |

O Conjunto de CEP integra a API [ViaCEP](https://viacep.com.br/) — ao preencher o campo CEP no `render.html`, os demais campos do conjunto são preenchidos automaticamente.

## Sobre os valores dos campos

Os campos `value` e `values` são inicialmente definidos no `formBuilder`.

No formRender, essas propriedades mantêm os valores originais configurados no `formBuilder`, mesmo após o usuário preencher ou selecionar campos — ou seja, elas não são atualizadas automaticamente durante a interação.

Os dados informados pelo usuário no `formRender` são armazenados na propriedade `userData` (um array).

A função `normalizeFormData` utiliza esses dados para sincronizar o estado dos campos:

- Para campos preenchíveis, atualiza a propriedade `value` com base em `userData`.
- Para campos selecionáveis, atualiza a propriedade `values`, ajustando o estado (`selected`) de cada opção conforme os valores presentes em `userData`.

## Estruturas complementares

Além da inicialização padrão, `builder.js` e `render.js` contam com funções auxiliares que estendem o comportamento do formBuilder e formRender.

### builder.js

**`preloadFormBuilderData(formBuilder)`**

Pré-carrega uma estrutura de formulário no builder a partir de uma fonte externa (ex: `assets/demo/formData.json`). Utiliza a action `setData` do formBuilder, sendo útil em cenários de edição onde o formulário já existe e precisa ser carregado para modificação. Está comentada por padrão — para ativar, descomente a chamada em `initFormBuilder`.

**`resetFormDataValues(formData)`**

Chamada internamente pelo botão "Salvar" antes de persistir o `formData` no `localStorage`. Garante que os dados salvos representem a estrutura do formulário sem valores preenchidos pelo usuário, evitando que respostas de uma sessão anterior sejam carregadas como padrão no render. Trata dois grupos de campos:

- Preenchíveis (`text`, `number`, `textarea`, `date`, `file`) — redefine `value` para `""`.
- Selecionáveis (`autocomplete`, `radio-group`, `select`, `checkbox-group`) — redefine `selected` para `false` em todas as opções.

### render.js

**`normalizeFormData(userData)`**

Chamada internamente no evento `submit` do formulário, antes de serializar os dados. Aplica ajustes que o formRender não realiza automaticamente ao coletar as respostas do usuário via `formRender.userData`. Trata dois grupos de campos:

- Preenchíveis (`text`, `number`, `textarea`, `date`) — atualiza `value` com o primeiro item de `field.userData`.
- Selecionáveis (`autocomplete`, `radio-group`, `select`, `checkbox-group`) — sincroniza `selected` de cada opção em `values` com os valores presentes em `field.userData`, garantindo que opções desmarcadas sejam corretamente refletidas como `false`.

## Persistência do formulário

O builder e o render se comunicam via `localStorage`. O fluxo é:

1. No **builder**, o botão "Salvar" persiste a definição do formulário:

    ```js
    localStorage.setItem("formBuilderData", getData("json"));
    ```

2. No **render**, o `formData` é lido do `localStorage` na inicialização:

    ```js
    const formData = localStorage.getItem("formBuilderData");
    ```

Alternativamente, o render pode carregar um formulário a partir do arquivo `assets/demo/formData.json`, útil para testes sem depender do builder. Para isso, descomente a Opção 1 em `render.js`.

## Dependências

| Pacote                | Versão  |
| :-------------------- | :------ |
| formBuilder           | ^3.22.0 |
| formbuilder-languages | ^1.2.0  |
| bootstrap             | ^5.3.8  |
| bootstrap-icons       | ^1.13.1 |
| jquery                | ^4.0.0  |
| jquery-ui             | ^1.14.2 |

## Instalação

```bash
npm install
```

Abra as páginas diretamente no navegador ou utilize uma extensão como [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

## Licença

Este projeto está licenciado sob a [Licença MIT](https://opensource.org/licenses/MIT).

## Autor

Rafael Carls
