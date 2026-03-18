// ============================================================
// PLANTILLA: usuario.service.ts
// ============================================================
// Ejemplo de servicio CRUD completo para un modelo simple.
//
// Para adaptarlo a tu modelo:
//   1. Cambia el import: { usuario } → { TuModelo }
//   2. Cambia los tipos Prisma: Prisma.usuarioXxx → Prisma.TuModeloXxx
//   3. Cambia las llamadas: this.prisma.usuario → this.prisma.tuModelo
//   4. Renombra el archivo: tumodelo.service.ts
//   5. Registra el servicio en app.module.ts
// ============================================================

import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';
import { usuario, Prisma } from './generated/prisma/client.js';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  // Buscar un registro por su clave única (generalmente el id)
  async user(
    usuarioWhereUniqueInput: Prisma.usuarioWhereUniqueInput,
  ): Promise<usuario | null> {
    return this.prisma.usuario.findUnique({
      where: usuarioWhereUniqueInput,
    });
  }

  // Listar registros con soporte para paginación, filtros y ordenamiento
  async usuarios(params: {
    skip?: number; // Para paginación: offset
    take?: number; // Para paginación: límite
    cursor?: Prisma.usuarioWhereUniqueInput; // Cursor-based pagination
    where?: Prisma.usuarioWhereInput; // Filtros
    orderBy?: Prisma.usuarioOrderByWithRelationInput; // Ordenamiento
  }): Promise<usuario[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.usuario.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  // Crear un nuevo registro
  async createUsuario(data: Prisma.usuarioCreateInput): Promise<usuario> {
    return this.prisma.usuario.create({
      data,
    });
  }

  // Actualizar un registro existente
  async updateUsuario(params: {
    where: Prisma.usuarioWhereUniqueInput;
    data: Prisma.usuarioUpdateInput;
  }): Promise<usuario> {
    const { where, data } = params;
    return this.prisma.usuario.update({
      data,
      where,
    });
  }

  // Eliminar un registro
  async deleteUsuario(where: Prisma.usuarioWhereUniqueInput): Promise<usuario> {
    return this.prisma.usuario.delete({
      where,
    });
  }
}
