import { Injectable } from '@nestjs/common';
import { Intent } from '@domain/models/intent.model';
import { IntentRepository } from '@infrastructure/repositories/intent.repository';
import { EmbedService } from '@application/network_analyser/services/embed.service';

@Injectable()
export class IntentService {
  constructor(
    private readonly intentRepository: IntentRepository,
    private readonly embedService: EmbedService) { }

  async createIntent(
    userId: string,
    goalTitle: string,
    goalDescription: string,
    metadata: Record<string, any>,
    voiceFileLink?: string | null,
  ): Promise<Intent> {

    let goals = metadata;
    goals["intent"] = goalTitle;
    goals["intent_description"] = goalDescription;
    const flattenJsonToEmbedding = await this.embedService.flattenJsonToEmbedding(goals);
    const vector = await this.embedService.getEmbedding(flattenJsonToEmbedding);

    const intent = await this.intentRepository.createWithvector(
      userId,
      goalTitle,
      goalDescription,
      metadata,
      voiceFileLink,
      vector,
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
    const intent = await this.intentRepository.findById(intentId);
    if (!intent) {
      throw new Error(`Intent with ID ${intentId} not found`);
    }
    if (!goalTitle || !goalDescription) {
      throw new Error('Goal title and description are required');
    }

    let goals = metadata ?? intent.metadata;
    goals["intent"] = goalTitle;
    goals["intent_description"] = goalDescription;

    const flattenJsonToEmbedding = await this.embedService.flattenJsonToEmbedding(goals);
    const vector = await this.embedService.getEmbedding(flattenJsonToEmbedding);

    const updatedIntent = await this.intentRepository.update(
      intentId,
      goalTitle,
      goalDescription,
      metadata ?? intent.metadata,
      voiceFileLink,
      vector,
    );

    return updatedIntent;
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
