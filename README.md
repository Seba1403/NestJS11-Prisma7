# NestJS 11 + Prisma 7.5 + PostgreSQL 18.3 — Plantilla base

Plantilla lista para usar como punto de partida en proyectos con **NestJS**, **Prisma ORM** y **PostgreSQL**.

Incluye dos modelos de ejemplo (`usuario` y `comida_favorita`) con relación uno-a-muchos, CRUD completo y estructura de servicios lista para replicar.

---

## 📁 Estructura del proyecto

```
.
├── prisma/
│   ├── schema.prisma          # Definimos los modelos
├── src/
│   ├── generated/prisma/      # Generado automáticamente, no tocar
│   ├── main.ts                # Entry point, no suele modificarse
│   ├── app.module.ts          # 💥🔧 Añadimos los módulos que queramos utilizar
│   ├── app.controller.ts      # 💥🔧 Definimos rutas aqui
│   ├── app.service.ts         # Servicio base (puedes ignorarlo)
│   ├── prisma.service.ts      # Conexión a DB, no suele modificarse
│   ├── usuario.service.ts     # 👈 Ejemplo de servicio CRUD
│   └── comida_favorita.service.ts  # 👈 Ejemplo de servicio CRUD con relación
├── .env                       # 💥🔧 Variables de entorno🔧
├── .env.example               # 👈 Plantilla de variables de entorno
└── package.json
```

---

## ⚙️ Cómo usar esta plantilla en un proyecto nuevo

### 1. Clonar e instalar

```bash
git clone <repo-url> nombre-de-tu-proyecto
cd nombre-de-tu-proyecto
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
```

Luego edita `.env` con tus datos:

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_db"
PORT=3000
```

### 3. Definir tus modelos en Prisma
 
**Opción A — Base de datos ya existe (la más común):**
 
Si ya tienes una base de datos creada, Prisma puede leer su estructura y generar el `schema.prisma` automáticamente:
 
```bash
npx prisma db pull
```
 
> Esto conecta a la DB definida en `DATABASE_URL`, lee todas las tablas y genera los modelos en `schema.prisma`. Después solo corre `npx prisma generate` para tener el cliente listo.
 
**Opción B — Partir desde cero:**
 
Abre `prisma/schema.prisma` y reemplaza (o agrega) los modelos de ejemplo con los tuyos:
 
```prisma
model MiModelo {
  id     Int    @id @default(autoincrement())
  nombre String @db.VarChar(100)
}
```
 
### 4. Generar el cliente y/o migrar
 
**Si usaste `db pull` (Opción A):**
```bash
# Solo genera el cliente, la DB ya tiene las tablas
npx prisma generate
```
 
**Si definiste los modelos a mano (Opción B):**
```bash
# Crea la migración y aplica los cambios en la DB
npx prisma migrate dev --name init
# (genera el cliente automáticamente)
```
 
> ⚠️ Cada vez que modifiques `schema.prisma`, debes correr `migrate dev` y `generate`.
 
### 5. Crear tus servicios
 
Copia `usuario.service.ts` como base y reemplaza:
- El tipo importado (`usuario` → tu modelo)
- Los tipos de Prisma (`Prisma.usuarioWhereUniqueInput` → los de tu modelo)
- El nombre del método del cliente (`this.prisma.usuario` → `this.prisma.tuModelo`)
 
```ts
// De esto:
import { usuario, Prisma } from './generated/prisma/client.js';
// A esto:
import { MiModelo, Prisma } from './generated/prisma/client.js';
```
 
### 6. Registrar servicios en el módulo
 
En `app.module.ts`, agrega tus servicios en `providers`:
 
```ts
@Module({
  providers: [AppService, PrismaService, MiModeloService],
})
```
 
### 7. Agregar rutas en el controller
 
En `app.controller.ts`, inyecta tu servicio y agrega los endpoints:
 
```ts
constructor(private readonly MiModeloService: MiModeloService) {}
 
@Get('mis-datos')
async getAll() {
  return this.MiModeloService.miModelos({});
}
```
 
### 8. Levantar el servidor
 
```bash
npm run start:dev
```
 
---
 
## 📡 Endpoints del ejemplo
 
### Usuarios
 
| Método | Ruta | Body | Descripción |
|---|---|---|---|
| `GET` | `/usuarios` | — | Listar todos |
| `POST` | `/usuario` | `{ "nombre": "Juan" }` | Crear usuario |
 
### Comidas favoritas
 
| Método | Ruta | Body | Descripción |
|---|---|---|---|
| `GET` | `/comidas` | — | Listar todas |
| `GET` | `/comida/:id` | — | Buscar por ID |
| `GET` | `/buscar-comida/:texto` | — | Buscar por nombre |
| `POST` | `/comida` | `{ "nombre_comida": "Pizza", "usuario_id": 1 }` | Crear comida |
 
---
 
## 🗂️ Modelos de ejemplo
 
```
usuario (1) ──────< comida_favorita (N)
```
 
```prisma
model usuario {
  id              Int               @id @default(autoincrement())
  nombre          String            @db.VarChar(100)
  comida_favorita comida_favorita[]
}
 
model comida_favorita {
  id            Int     @id @default(autoincrement())
  nombre_comida String  @db.VarChar(100)
  usuario_id    Int
  usuario       usuario @relation(fields: [usuario_id], references: [id], onDelete: Cascade)
}
```
 
---
 
## 🛠️ Scripts útiles
 
| Comando | Descripción |
|---|---|
| `npm run start:dev` | Modo desarrollo con hot-reload |
| `npm run build` | Compilar para producción |
| `npm run start:prod` | Levantar build de producción |
| `npm run test` | Correr tests |
| `npm run lint` | Linting con ESLint |
| `npx prisma db pull` | Genera el schema desde una DB existente |
| `npx prisma migrate dev` | Crear y aplicar migración |
| `npx prisma generate` | Regenerar cliente Prisma |
| `npx prisma studio` | GUI visual de la base de datos |
 
---
 
## ✅ Checklist para un proyecto nuevo
 
- [ ] Clonar repo y `npm install`
- [ ] Copiar `.env.example` → `.env` y completar datos
- [ ] **Si la DB ya existe:** correr `npx prisma db pull` + `npx prisma generate`
- [ ] **Si partes desde cero:** definir modelos en `schema.prisma` + `npx prisma migrate dev --name init`
- [ ] Crear servicios basados en `usuario.service.ts`
- [ ] Registrar servicios en `app.module.ts`
- [ ] Agregar endpoints en `app.controller.ts`
- [ ] `npm run start:dev` y probar