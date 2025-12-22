// import { Injectable } from '@nestjs/common';
// import { Intent } from '@domain/models/intent.model';
// import { IntentRepository } from '@infrastructure/repositories/intent.repository';

// @Injectable()
// export class IntentService {
//   constructor(private readonly intentRepository: IntentRepository) {}

//   async createIntent(
//     userId: string,
//     goalTitle: string,
//     goalDescription: string,
//     metadata: Record<string, any>,
//     voiceFileLink?: string | null,
//   ): Promise<Intent> {
//     console.log(`Creating intent for user ${userId}: ${goalTitle}`);
    
//     const intent = await this.intentRepository.create(
//       userId,
//       goalTitle,
//       goalDescription,
//       metadata,
//       voiceFileLink,
//     );

//     console.log(`Intent created with ID: ${intent.id}`);
//     return intent;
//   }

//   async updateIntent(
//     intentId: string,
//     goalTitle?: string,
//     goalDescription?: string,
//     metadata?: Record<string, any>,
//     voiceFileLink?: string | null,
//   ): Promise<Intent> {
//     console.log(`Updating intent ${intentId}`);
    
//     const intent = await this.intentRepository.update(
//       intentId,
//       goalTitle,
//       goalDescription,
//       metadata,
//       voiceFileLink,
//     );

//     console.log(`Intent ${intentId} updated successfully`);
//     return intent;
//   }

//   async deleteIntent(intentId: string): Promise<{ success: boolean; message: string }> {
//     console.log(`Deleting intent ${intentId}`);
    
//     await this.intentRepository.softDelete(intentId);

//     console.log(`Intent ${intentId} soft deleted successfully`);
//     return {
//       success: true,
//       message: `Intent ${intentId} deleted successfully`,
//     };
//   }

//   async getIntentById(intentId: string): Promise<Intent> {
//     console.log(`Fetching intent ${intentId}`);
    
//     const intent = await this.intentRepository.findById(intentId);

//     if (!intent) {
//       throw new Error(`Intent with ID ${intentId} not found`);
//     }

//     console.log(`Intent ${intentId} fetched successfully`);
//     return intent;
//   }

//   async getIntentsByUserId(userId: string): Promise<Intent[]> {
//     console.log(`Fetching intents for user ${userId}`);
    
//     const intents = await this.intentRepository.findByUserId(userId);

//     console.log(`Found ${intents.length} intents for user ${userId}`);
//     return intents;
//   }
// }
