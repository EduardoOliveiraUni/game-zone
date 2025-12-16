# 🎮 Game Zone

**Game Zone** é um projeto web que ajuda usuários a **descobrir jogos similares** com base em títulos que eles já jogam.  
O foco do MVP é uma **experiência simples, rápida e inteligente**, utilizando busca em tempo real, popularidade e recomendações por similaridade.

---

## 🚀 Funcionalidades

### 🔍 Busca inteligente
- Busca em tempo real com **debounce**
- Filtro por título e descrição
- Feedback visual para estados vazios

### ⭐ Jogos populares
- Sistema de **popularidade (0–10)**
- Home exibe jogos populares selecionados de forma dinâmica
- Fallback automático quando não há resultados na busca

### 🎯 Recomendações de jogos similares
- Lógica híbrida:
  - `similarIds` definidos manualmente (quando existem)
  - Score automático baseado em:
    - Tags em comum
    - Gênero
    - Ano de lançamento
- Evita sugestões sem relação com o jogo atual
- Exibe somente jogos realmente relevantes

### 📄 Página de detalhes do jogo
- Informações completas do jogo
- Layout responsivo
- Seção de jogos similares
- Mensagem amigável quando não há recomendações diretas

### 🧱 Arquitetura organizada
- Tipos centralizados (`GameBase`, `GameDetail`)
- API mock separada do frontend
- Componentes reutilizáveis
- Código preparado para futura integração com backend real

---

## 🛠️ Tecnologias utilizadas

- **Next.js (App Router)**
- **React**
- **TypeScript**
- **SCSS Modules**
- **Material UI (ícones)**
- **API Routes (Next.js)**
- **Mock de dados local**

---

## 📁 Estrutura do projeto

```bash
src/
├─ app/
│  ├─ page.tsx                # Home
│  ├─ game/[id]/page.tsx      # Detalhes do jogo
│  └─ api/
│     └─ games/
│        ├─ route.ts          # Lista de jogos
│        └─ [id]/
│           ├─ route.ts       # Detalhes do jogo
│           └─ similar/
│              └─ route.ts    # Jogos similares
│
├─ components/
│  ├─ HeaderMenu/
│  ├─ HomeHeader/
│  ├─ SearchInput/
│  ├─ GameCard/
│  ├─ GameList/
│  ├─ GameDetails/
│  └─ SimilarGames/
│
├─ mocks/
│  └─ games.ts                # Base de dados mock
│
├─ types/
│  └─ Game.ts                 # Tipos centralizados
│
└─ styles/
