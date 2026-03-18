// ============================================================
// PLANTILLA: app.controller.ts
// ============================================================
// Define las rutas HTTP de la aplicación.
//
// Decoradores disponibles:
//   @Get('ruta')       → GET  /ruta
//   @Post('ruta')      → POST /ruta
//   @Put('ruta/:id')   → PUT  /ruta/:id
//   @Delete('ruta/:id')→ DELETE /ruta/:id
//
//   @Param('id')       → Lee parámetros de la URL (:id)
//   @Body()            → Lee el body del request (JSON)
//   @Query('campo')    → Lee query params (?campo=valor)
//
// Para agregar rutas nuevas:
//   1. Inyecta tu servicio en el constructor
//   2. Agrega el método con el decorador correspondiente
// ============================================================

import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { UsuarioService } from './usuario.service.js';
import { ComidaFavoritaService } from './comida_favorita.service.js';
import {
  comida_favoritaModel,
  usuarioModel,
} from './generated/prisma/models.js';

@Controller()
export class AppController {
  // 👇 Inyecta tus servicios aquí
  constructor(
    private readonly UsuarioService: UsuarioService,
    private readonly ComidaService: ComidaFavoritaService,
  ) {}

  // ──────────────────────────────────────────
  // Rutas de ejemplo: Comidas favoritas
  // ──────────────────────────────────────────

  // GET /comidas → devuelve todas las comidas
  @Get('comidas')
  async getAllComidas(): Promise<comida_favoritaModel[]> {
    return this.ComidaService.comida_favoritas({});
  }

  // GET /comida/:id → devuelve una comida por su ID
  @Get('comida/:id')
  async getComida(
    @Param('id') id: string,
  ): Promise<comida_favoritaModel | null> {
    return this.ComidaService.comida_favorita({ id: Number(id) });
  }

  // GET /buscar-comida/:texto → filtra por nombre
  // Ejemplo de uso del campo "where" con "contains" de Prisma
  @Get('buscar-comida/:searchString')
  async getFilteredComidas(
    @Param('searchString') searchString: string,
  ): Promise<comida_favoritaModel[]> {
    return this.ComidaService.comida_favoritas({
      where: { nombre_comida: { contains: searchString } },
    });
  }

  // POST /comida → crea una comida ligada a un usuario
  // Body esperado: { "nombre_comida": "Pizza", "usuario_id": 1 }
  @Post('comida')
  async createComida(
    @Body() data: { nombre_comida: string; usuario_id: number },
  ): Promise<comida_favoritaModel> {
    const { nombre_comida, usuario_id } = data;
    return this.ComidaService.createComidaFavorita({
      nombre_comida,
      // Así se conecta una relación en Prisma al crear
      usuario: { connect: { id: usuario_id } },
    });
  }

  // ──────────────────────────────────────────
  // Rutas de ejemplo: Usuarios
  // ──────────────────────────────────────────

  // GET /usuarios → devuelve todos los usuarios
  @Get('usuarios')
  async getAllUsuarios(): Promise<usuarioModel[]> {
    return this.UsuarioService.usuarios({});
  }

  // POST /usuario → crea un usuario
  // Body esperado: { "nombre": "Juan" }
  @Post('usuario')
  async createUsuario(@Body() data: { nombre: string }): Promise<usuarioModel> {
    const { nombre } = data;
    return this.UsuarioService.createUsuario({ nombre });
  }
}
