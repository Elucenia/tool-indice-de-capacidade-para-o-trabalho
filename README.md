# Índice de Capacidade para o Trabalho (ICT)

Identificador: `indice-de-capacidade-para-o-trabalho`. Pacote independente da plataforma Elucenia, para navegador e Node.js.

## Situação

- Revisão: **needs-review**. Revisão documental e clínica independente pendente.
- Execução: **disponível para reprodução técnica da fórmula**.
- Validação clínica independente: **não realizada**. Os testes abaixo verificam aritmética e transporte dos campos.
- 4 casos de referência em `examples.json`, conferidos por `test.cjs`. Verificação aritmética independente da fórmula (reimplementação a partir da literatura, entradas aleatórias): **pendente**.
- Dados: o exemplo funciona localmente, sem rede, armazenamento ou identificação de pacientes.

## Uso no Node.js

```js
const { calculate } = require('./calculator.js');
const example = require('./examples.json')[0];
console.log(calculate(example.input));
```

Execute `node test.cjs` (ou `npm test`) para conferir os exemplos. Abra `index.html` para usar a versão local do navegador. Não há dependências npm.

## Contrato

`calculate(input)` recebe um objeto, devolve `{id, main, label, raw, clinicalValidation}` ou `{error, code, field?}`. Consulte `tool.json` e `metadata.fields` para nomes, unidades, opções e intervalos. Números aceitam valores finitos ou strings numéricas; opções precisam corresponder às chaves documentadas. Campos obrigatórios vazios, booleanos inválidos, valores fora de intervalo e resultados não finitos são rejeitados. Somente checkbox omitido representa falso; um campo numérico ou uma opção obrigatória nunca é preenchido automaticamente.

Interpretações, ordens terapêuticas e tabelas herdadas não são retornadas pelo adaptador. Classificações e valores ainda dependem da população e das limitações da fonte.

## Fórmula / versão

Soma de 7 dimensões: (1) 0 a 10; (2) exigências físicas e mentais (1 a 5 cada), ponderadas pela natureza do trabalho: principalmente físico = física × 1,5 + mental × 0,5; principalmente mental = física × 0,5 + mental × 1,5; ambos = física + mental (2 a 10); (3) doenças: nenhuma 7, uma 5, duas 4, três 3, quatro 2, cinco ou mais 1; (4) perda para o trabalho 1 a 6; (5) faltas 1 a 5; (6) prognóstico 1, 4 ou 7; (7) recursos mentais: soma das três perguntas (0 a 12) convertida em 0 a 3 = 1, 4 a 6 = 2, 7 a 9 = 3, 10 a 12 = 4.Total de 7 a 49.

A transcrição acima documenta o acervo de origem e pode requerer atualização. 

## Condições e limites

Avalia como o próprio trabalhador percebe sua capacidade para o trabalho, considerando as exigências da função, doenças, faltas e recursos mentais.

Confirme população, exclusões, unidades, versão e diretriz aplicável ao país e serviço. O resultado não deve ser utilizado isoladamente para diagnóstico, alta ou prescrição. O pacote não representa certificação clínica, aprovação regulatória ou indicação para toda população. Veja a revisão completa em `tool.json`.

## Fontes originais

- [Ilmarinen J. The Work Ability Index (WAI). Occup Med (Lond), 2007.](https://doi.org/10.1093/occmed/kqm008)
- [Martinez MC, Latorre MRDO, Fischer FM. Validade e confiabilidade da versão brasileira do Índice de Capacidade para o Trabalho. Rev Saúde Pública, 2009.](https://doi.org/10.1590/S0034-89102009000300017)

## Exemplos e rastreabilidade

`examples.json` preserva `originalInput`, expectativa e entrada explícita do exemplo. Não foi necessário expandir opções zero nos exemplos.

## O que esta ferramenta não faz

- Não diagnostica, não prescreve e não substitui a avaliação de um médico. O resultado é a reprodução técnica de uma fórmula ou escore publicado.
- Não envia dados a lugar nenhum: roda no navegador ou no Node.js, sem rede, sem telemetria, sem armazenamento.
- Não guarda nem identifica pacientes. Não use com dados identificáveis fora de um ambiente que você controla.
- Não tem validação clínica independente nem aprovação regulatória (ver "Situação").

## Autoria e licença

Criado e mantido por **Felipe Guedes** (Engenheiro de Software e Arquiteto de Sistemas, Toledo, Paraná, Brasil) para a **Elucenia**, uma cadeia médica e científica global para acelerar a descoberta. Criado em 2026-09-25 na organização [github.com/Elucenia](https://github.com/Elucenia).

Licença **Apache-2.0** (arquivo `LICENSE`): você pode usar, copiar, modificar e embutir este código no seu site ou sistema, inclusive comercial, desde que mantenha o arquivo `NOTICE` e o aviso de copyright e declare as modificações. A licença cobre o código deste pacote; instrumentos, questionários, tabelas, traduções e marcas citados nas fontes mantêm os direitos dos seus titulares (ver `NOTICE`). Detalhes em `AUTHORSHIP.md`, `CITATION.cff`, `SECURITY.md` e `CONTRIBUTING.md`. Contato: contato@elucenia.org.
