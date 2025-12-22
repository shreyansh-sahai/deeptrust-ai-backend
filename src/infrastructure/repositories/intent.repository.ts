// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../database/prisma.service';
// import { Intent } from '../../domain/models/intent.model';

// @Injectable()
// export class IntentRepository {
//   constructor(private readonly prisma: PrismaService) {}

//   async create(
//     userId: string,
//     goalTitle: string,
//     goalDescription: string,
//     metadata: Record<string, any>,
//     voiceFileLink?: string | null,
//   ): Promise<Intent> {
//     const intent = await this.prisma.networkUserIntent.create({
//       data: {
//         userId,
//         intent: goalTitle,
//         intent_description: goalDescription,
//         metadata,
//         voice_file_link: voiceFileLink,
//       },
//     });

//     return new Intent(
//       intent.id,
//       intent.userId,
//       intent.intent,
//       intent.intent_description,
//       intent.metadata as Record<string, any>,
//       intent.created_at,
//       intent.updated_at ?? undefined,
//       intent.voice_file_link,
//       intent.isDeleted,
//     );
//   }

//   async findById(id: string): Promise<Intent | null> {
//     const intent = await this.prisma.networkUserIntent.findUnique({
//       where: { id, isDeleted: false },
//     });

//     if (!intent) return null;

//     return new Intent(
//       intent.id,
//       intent.userId,
//       intent.intent,
//       intent.intent_description,
//       intent.metadata as Record<string, any>,
//       intent.created_at,
//       intent.updated_at ?? undefined,
//       intent.voice_file_link,
//       intent.isDeleted,
//     );
//   }

//   async findByUserId(userId: string): Promise<Intent[]> {
//     const intents = await this.prisma.networkUserIntent.findMany({
//       where: {
//         userId,
//         isDeleted: false,
//       },
//       orderBy: {
//         created_at: 'desc',
//       },
//     });

//     return intents.map(
//       (intent) =>
//         new Intent(
//           intent.id,
//           intent.userId,
//           intent.intent,
//           intent.intent_description,
//           intent.metadata as Record<string, any>,
//           intent.created_at,
//           intent.updated_at ?? undefined,
//           intent.voice_file_link,
//           intent.isDeleted,
//         ),
//     );
//   }

//   async update(
//     id: string,
//     goalTitle?: string,
//     goalDescription?: string,
//     metadata?: Record<string, any>,
//     voiceFileLink?: string | null,
//   ): Promise<Intent> {
//     const intent = await this.prisma.networkUserIntent.update({
//       where: { id },
//       data: {
//         ...(goalTitle && { intent: goalTitle }),
//         ...(goalDescription && { intent_description: goalDescription }),
//         ...(metadata && { metadata }),
//         ...(voiceFileLink !== undefined && { voice_file_link: voiceFileLink }),
//         updated_at: new Date(),
//       },
//     });

//     return new Intent(
//       intent.id,
//       intent.userId,
//       intent.intent,
//       intent.intent_description,
//       intent.metadata as Record<string, any>,
//       intent.created_at,
//       intent.updated_at ?? undefined,
//       intent.voice_file_link,
//       intent.isDeleted,
//     );
//   }

//   async softDelete(id: string): Promise<void> {
//     await this.prisma.networkUserIntent.update({
//       where: { id },
//       data: {
//         isDeleted: true,
//         updated_at: new Date(),
//       },
//     });
//   }
// }
