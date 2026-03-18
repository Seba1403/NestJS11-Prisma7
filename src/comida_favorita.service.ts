// ============================================================
// PLANTILLA: comida_favorita.service.ts
// ============================================================
// Ejemplo de servicio CRUD para un modelo que tiene
// una relación foránea (pertenece a usuario).
//
// Diferencia clave respecto a usuario.service.ts:
//   - createComidaFavorita recibe una relación anidada
//     via Prisma.comida_favoritaCreateInput, que incluye
//     { usuario: { connect: { id: usuario_id } } }
//   - Esto es el patrón estándar de Prisma para relaciones
// ============================================================

import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';
import { comida_favorita, Prisma } from './generated/prisma/client.js';

@Injectable()
export class ComidaFavoritaService {
  constructor(private prisma: PrismaService) {}

  // Buscar por clave única
  async comida_favorita(
    comida_favoritaWhereUniqueInput: Prisma.comida_favoritaWhereUniqueInput,
  ): Promise<comida_favorita | null> {
    return this.prisma.comida_favorita.findUnique({
      where: comida_favoritaWhereUniqueInput,
    });
  }

  // Listar con filtros opcionales
  // Ejemplo de uso desde el controller:
  //   this.ComidaService.comida_favoritas({
  //     where: { nombre_comida: { contains: 'pizza' } }
  //   })
  async comida_favoritas(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.comida_favoritaWhereUniqueInput;
    where?: Prisma.comida_favoritaWhereInput;
    orderBy?: Prisma.comida_favoritaOrderByWithRelationInput;
  }): Promise<comida_favorita[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.comida_favorita.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  // Crear con relación anidada
  // El controller debe pasar:
  //   { nombre_comida, usuario: { connect: { id: usuario_id } } }
  async createComidaFavorita(
    data: Prisma.comida_favoritaCreateInput,
  ): Promise<comida_favorita> {
    return this.prisma.comida_favorita.create({
      data,
    });
  }

  // Actualizar
  async updateComidaFavorita(params: {
    where: Prisma.comida_favoritaWhereUniqueInput;
    data: Prisma.comida_favoritaUpdateInput;
  }): Promise<comida_favorita> {
    const { data, where } = params;
    return this.prisma.comida_favorita.update({
      data,
      where,
    });
  }

  // Eliminar
  async deleteComidaFavorita(
    where: Prisma.comida_favoritaWhereUniqueInput,
  ): Promise<comida_favorita> {
    return this.prisma.comida_favorita.delete({
      where,
    });
  }
}
