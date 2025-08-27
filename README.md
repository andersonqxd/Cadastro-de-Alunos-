# Cadastro de Alunos — Node.js + Express + PostgreSQL + Prisma (MVC)



**`src/server.js`**
```js
require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // lê x-www-form-urlencoded

app.get("/", (_, res) => res.json({ status: "OK", service: "cadastro-alunos-api" }));

app.use("/alunos", require("./routes/alunoRoutes"));
app.use("/professores", require("./routes/professorRoutes"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
```



## 🔐 Validações & Tratamento de Erros
- **ID inválido**: `400 Bad Request`
- **Registro não encontrado**: `404 Not Found`
- **E-mail duplicado**: `409 Conflict`
- **Erro interno**: `500 Internal Server Error`

---

## 🛣️ Endpoints (Alunos)
- `GET /alunos` — lista todos
- `POST /alunos` — cria (`x-www-form-urlencoded`): `nome`, `email`, `idade`
- `PUT /alunos/:id` — atualiza **nome** e/ou **email**
- `DELETE /alunos/:id` — remove por ID

## 🛣️ Endpoints (Professores)
- `GET /professores`
- `POST /professores`
- `PUT /professores/:id`
- `DELETE /professores/:id`

---

## 🧪 Testes rápidos (curl)
**Criar aluno (x-www-form-urlencoded):**
```bash
curl -X POST http://localhost:3000/alunos \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "nome=Maria Silva&email=maria@escola.com&idade=22"
```

**Listar alunos:**
```bash
curl http://localhost:3000/alunos
```

**Atualizar aluno:**
```bash
curl -X PUT http://localhost:3000/alunos/1 \
  -H "Content-Type: application/json" \
  -d '{"nome":"Maria S.","email":"maria.s@escola.com"}'
```

**Deletar aluno:**
```bash
curl -X DELETE http://localhost:3000/alunos/1
```

> Repita os mesmos padrões para **/professores**.

---

## 🚀 Runbook
```bash
# 1) Subir Postgres local (exemplo via Docker)
docker run --name pg -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres

# 2) Configurar .env (DATABASE_URL)

# 3) Migrations
npm run migrate

# 4) Rodar em dev
npm run dev

# 5) Acessar
# GET raiz: http://localhost:3000/
# HTML (opcional): abra src/views/form.html no navegador
```

---

## 📊 Observabilidade (dica)
- Use `prisma studio` para inspecionar dados:
```bash
npm run studio
```

---

## ✅ Critérios de Aceite (checklist)
- [x] CRUD completo para **Alunos** e **Professores**
- [x] **Prisma** configurado com **PostgreSQL**
- [x] Padrão **MVC** implementado
- [x] `express.urlencoded()` ativo para **x-www-form-urlencoded**
- [x] Tratamento de erros (400/404/409/500)
- [x] Testável via **navegador**, **HTML**, **curl** ou **Postman**

---

## 🧭 Próximos Passos (roadmap expressivo)
- Paginação e filtros (e.g., `GET /alunos?nome=...`)
- Validações robustas com `zod`/`yup`
- Logger (`pino`) e CORS
- Testes (`vitest`/`jest`) e GitHub Actions
- Swagger/OpenAPI para documentação viva# Cadastro de Alunos — Node.js + Express + PostgreSQL + Prisma (MVC)

> **Jarvs mode ON**: direto ao ponto, escalável e testável. Você terá uma API REST MVC para **Alunos** e **Professores** com PostgreSQL + Prisma.

---

## 🎯 Metáfora do Táxi (regras de negócio)
Pense no cadastro como um **táxi**: antes de “colocar alguém no carro” (criar/atualizar), verifique as condições:
- **Assento disponível** → e-mail **não existe** no banco (único).
- **Passageiro válido** → `nome` e `idade` informados corretamente.
- **Troca de passageiro** → ao **atualizar**, se o e-mail já existe em outro registro, **bloqueie**.
- **Remoção** → ao **deletar**, valide o **ID** (numérico e existente).

---

## 📦 Stack
- **Node.js + Express**
- **PostgreSQL**
- **Prisma ORM**
- Padrão **MVC** (controllers, routes, server)
- Testável via **navegador**, **HTML form** e **Postman/curl**

---

## 🗂️ Estrutura de Pastas (sugerida)
```
cadastro-alunos-api/
├─ prisma/
│  ├─ schema.prisma
│  └─ migrations/
├─ src/
│  ├─ controllers/
│  │  ├─ alunoController.js
│  │  └─ professorController.js
│  ├─ routes/
│  │  ├─ alunoRoutes.js
│  │  └─ professorRoutes.js
│  ├─ views/              # (opcional) HTML simples para testes
│  │  └─ form.html
│  ├─ lib/
│  │  └─ prisma.js        # singleton do PrismaClient
│  └─ server.js
├─ .env
├─ package.json
└─ README.md
```

---

## ⚙️ Setup Rápido

### 1) Dependências
```bash
npm init -y
npm i express @prisma/client pg dotenv
npm i -D prisma nodemon
```

### 2) Variáveis de Ambiente
Crie um arquivo **.env** na raiz:
```env
# Ajuste com suas credenciais
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/escola?schema=public"
PORT=3000
```

### 3) Prisma Init + Schema
```bash
npx prisma init
```

Substitua **prisma/schema.prisma** pelo conteúdo abaixo:
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Aluno {
  id    Int    @id @default(autoincrement())
  nome  String
  email String @unique
  idade Int
}

model Professor {
  id    Int    @id @default(autoincrement())
  nome  String
  email String @unique
  idade Int
}
```

Crie o banco/tabelas:
```bash
npx prisma migrate dev --name init
```

### 4) Prisma Client
```bash
npx prisma generate
```

### 5) Scripts no `package.json`
```json
{
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js",
    "migrate": "prisma migrate dev",
    "studio": "prisma studio"
  }
}
```
---

## 🔐 Validações & Tratamento de Erros
- **ID inválido**: `400 Bad Request`
- **Registro não encontrado**: `404 Not Found`
- **E-mail duplicado**: `409 Conflict`
- **Erro interno**: `500 Internal Server Error`

---

## 🛣️ Endpoints (Alunos)
- `GET /alunos` — lista todos
- `POST /alunos` — cria (`x-www-form-urlencoded`): `nome`, `email`, `idade`
- `PUT /alunos/:id` — atualiza **nome** e/ou **email**
- `DELETE /alunos/:id` — remove por ID

## 🛣️ Endpoints (Professores)
- `GET /professores`
- `POST /professores`
- `PUT /professores/:id`
- `DELETE /professores/:id`

---

## 🧪 Testes rápidos (curl)
**Criar aluno (x-www-form-urlencoded):**
```bash
curl -X POST http://localhost:3000/alunos \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "nome=Maria Silva&email=maria@escola.com&idade=22"
```

**Listar alunos:**
```bash
curl http://localhost:3000/alunos
```

**Atualizar aluno:**
```bash
curl -X PUT http://localhost:3000/alunos/1 \
  -H "Content-Type: application/json" \
  -d '{"nome":"Maria S.","email":"maria.s@escola.com"}'
```

**Deletar aluno:**
```bash
curl -X DELETE http://localhost:3000/alunos/1
```

> Repita os mesmos padrões para **/professores**.

---

## 🚀 Runbook
```bash
# 1) Subir Postgres local (exemplo via Docker)
docker run --name pg -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres

# 2) Configurar .env (DATABASE_URL)

# 3) Migrations
npm run migrate

# 4) Rodar em dev
npm run dev

# 5) Acessar
# GET raiz: http://localhost:3000/
# HTML (opcional): abra src/views/form.html no navegador
```

---

## 📊 Observabilidade (dica)
- Use `prisma studio` para inspecionar dados:
```bash
npm run studio
```

---

## ✅ Critérios de Aceite (checklist)
- [x] CRUD completo para **Alunos** e **Professores**
- [x] **Prisma** configurado com **PostgreSQL**
- [x] Padrão **MVC** implementado
- [x] `express.urlencoded()` ativo para **x-www-form-urlencoded**
- [x] Tratamento de erros (400/404/409/500)
- [x] Testável via **navegador**, **HTML**, **curl** ou **Postman**

---

## 🧭 Próximos Passos (roadmap expressivo)
- Paginação e filtros (e.g., `GET /alunos?nome=...`)
- Validações robustas com `zod`/`yup`
- Logger (`pino`) e CORS
- Testes (`vitest`/`jest`) e GitHub Actions
- Swagger/OpenAPI para documentação viva