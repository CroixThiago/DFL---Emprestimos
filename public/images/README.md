# Pasta de Imagens e Ativos Estáticos (DFL Consignado)

Esta pasta foi projetada especificamente para organizar e centralizar todas as imagens e logotipos da aplicação em um só lugar. Isso permite que você altere qualquer imagem do site diretamente, **sem precisar modificar nenhuma linha de código**!

---

## 📂 Como está organizada a estrutura:

```text
public/images/
├── partners/               # Logotipos dos bancos parceiros
│   ├── caixa.svg
│   ├── bb.svg
│   ├── itau.svg
│   ├── bradesco.svg
│   ├── santander.svg
│   └── bmg.svg
│
└── testimonials/           # Avatares das pessoas nos depoimentos
    ├── maria.svg
    ├── sandra.svg
    ├── carlos.svg
    └── joao.svg
```

---

## 🔄 Como alterar uma imagem:

1. **Prepare sua nova imagem**:
   - Salve-a no formato desejado (PNG, JPG, JPEG ou SVG).
   - Dica: Prefira tamanhos otimizados para web para manter a página super rápida (ex: avatares em 120x120 pixels; logos em 120x40 pixels).

2. **Substitua o arquivo na pasta correspondente**:
   - Para manter zero alteração de código, salve a nova imagem com o **mesmo nome e extensão** do arquivo que deseja substituir (ex: substitua `public/images/testimonials/maria.svg` pelo seu novo arquivo `maria.svg`).
   - Se a extensão for diferente (por exemplo, trocar `maria.svg` por um arquivo de foto real `maria.jpg`), basta abrir o arquivo `/src/data.ts` e ajustar a propriedade `avatarUrl` ou `logo` do banco, apontando para o novo arquivo estático (ex: `"/images/testimonials/maria.jpg"`).

Pronto! A aplicação lerá a nova imagem automaticamente e atualizará todo o visual de forma instantânea.
