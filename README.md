# EliteStore - QA Project

**EliteStore** é um e-commerce fictício desenvolvido com o objetivo de fornecer um ambiente de prática para **Quality Assurance (QA)**.  
O sistema simula um site de compras online, possibilitando exercícios de **testes manuais**, **automação de testes** e **validação de qualidade de software**.

🔗 **Aplicação em produção:** [https://elitestore-qa.netlify.app/](https://elitestore-qa.netlify.app/)  

---

## 📌 Objetivo

O projeto foi criado com fins educacionais, permitindo que profissionais e estudantes de QA pratiquem:

- Criação e execução de **casos de teste manuais**  
- Escrita de **testes automatizados end-to-end**  
- Validação de **usabilidade e acessibilidade**  
- Simulação de **processos de QA aplicados a sistemas reais**  

---

## 🧭 Funcionalidades Principais

- Home page com destaques e banners promocionais

- Catálogo de produtos dividido por categorias

- Carrinho de compras (adicionar/remover produtos)

- Formulário de inscrição para newsletter

- Páginas institucionais (Sobre, Contato, Políticas)

- Footer com navegação e links de redes sociais

---

## 🧪 Testes Manuais Sugeridos
### Página Inicial

- Validar banners e textos promocionais

- Verificar links do header e footer

### Navegação

- Conferir carregamento de páginas a partir do menu

- Testar navegação via teclado (Tab/Shift+Tab)

- Carrinho

- Adicionar e remover produtos

- Validar cálculo de valores exibidos

- Formulário de Inscrição

- Testar envio de e-mails válidos e inválidos

- Confirmar mensagens de feedback ao usuário

### Acessibilidade

- Testar contraste de cores (WCAG)

- Validar uso de alt em imagens

- Confirmar ordem de tabulação

## 📋 Template de Caso de Teste

* **Título:** [Funcionalidade] O que será testado

* **Pré-condições:** estado inicial necessário

* **Passos:**

  1. ...
  2. ...

* **Resultado Esperado:** comportamento correto

* **Resultado Obtido:** (preencher durante execução)

* **Severidade/Prioridade:** classificar impacto

---

## 🤖 Automação Recomendada

Ferramentas sugeridas: **Cypress, Playwright** ou **Selenium**.

Cobertura inicial:

- Testes de navegação (header, footer)

- Fluxo de adicionar/remover produto no carrinho

- Validação do formulário de inscrição

- Smoke tests para páginas principais

## ♿ Acessibilidade (A11y)

Pontos a validar:

- Alternativas textuais em imagens (alt)

- Labels e aria-* em inputs e botões

- Navegação por teclado funcional

- Contraste adequado de cores

Ferramentas de apoio: **Axe, Lighthouse, NVDA, VoiceOver**

## 📑 Reporte de Bugs

Para reportar um bug, incluir:

* **Título:** resumo do problema

* **Descrição:** contexto do erro

* **Passos para reproduzir:** lista numerada

* **Resultado Esperado vs Obtido**

* **Evidências:** prints, vídeos ou logs

* **Severidade:** blocker, crítica, maior, menor ou trivial

---

## 🤝 Contribuição

Contribuições são bem-vindas. Para mudanças significativas, abra uma issue antes para discussão.

---
