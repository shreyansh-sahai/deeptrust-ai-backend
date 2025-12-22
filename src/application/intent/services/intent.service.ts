import { Injectable } from '@nestjs/common';
import { Intent } from '@domain/models/intent.model';
import { IntentRepository } from '@infrastructure/repositories/intent.repository';

@Injectable()
export class IntentService {
  constructor(private readonly intentRepository: IntentRepository) {}

  async createIntent(
    userId: string,
    goalTitle: string,
    goalDescription: string,
    metadata: Record<string, any>,
    voiceFileLink?: string | null,
  ): Promise<Intent> {
    const intent = await this.intentRepository.create(
      userId,
      goalTitle,
      goalDescription,
      metadata,
      voiceFileLink,
    );

    return intent;
  }

  async updateIntent(
    intentId: string,
    goalTitle?: string,
    goalDescription?: string,
    metadata?: Record<string, any>,
    voiceFileLink?: string | null,
  ): Promise<Intent> {
    const intent = await this.intentRepository.update(
      intentId,
      goalTitle,
      goalDescription,
      metadata,
      voiceFileLink,
    );

    return intent;
  }

  async deleteIntent(intentId: string): Promise<{ success: boolean; message: string }> {
    await this.intentRepository.softDelete(intentId);

    return {
      success: true,
      message: `Intent ${intentId} deleted successfully`,
    };
  }

  async getIntentById(intentId: string): Promise<Intent> {
    const intent = await this.intentRepository.findById(intentId);

    if (!intent) {
      throw new Error(`Intent with ID ${intentId} not found`);
    }

    return intent;
  }

  async getIntentsByUserId(userId: string): Promise<Intent[]> {
    const intents = await this.intentRepository.findByUserId(userId);
    return intents;
  }
}
