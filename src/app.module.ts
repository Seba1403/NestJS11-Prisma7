// ============================================================
// PLANTILLA: app.module.ts
// ============================================================
// Módulo raíz de la aplicación.
//
// Cuando agregues un servicio nuevo:
//   1. Importa el servicio arriba
//   2. Agrégalo al array providers[]
//
// Cuando agregues un controller nuevo:
//   1. Importa el controller
//   2. Agrégalo al array controllers[]
// ============================================================

import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaService } from './prisma.service.js';

// 👇 Importa tus servicios aquí
import { UsuarioService } from './usuario.service.js';
import { ComidaFavoritaService } from './comida_favorita.service.js';

@Module({
  imports: [],
  controllers: [AppController], // 👈 Agrega tus controllers aquí
  providers: [
    AppService,
    PrismaService, // Siempre debe estar (conexión a DB)
    UsuarioService, // 👈 Ejemplo — reemplaza con tus servicios
    ComidaFavoritaService,
  ],
})
export class AppModule {}
