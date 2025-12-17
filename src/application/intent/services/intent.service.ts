import { Injectable } from '@nestjs/common';
import { Intent } from '@domain/models/intent.model';

@Injectable()
export class IntentService {


  async createIntent(
    userId: string,
    goalTitle: string,
    goalDescription: string,
    metadata: Record<string, any>,
  ): Promise<Intent> {
    console.log(`Creating intent for user ${userId}: ${goalTitle}`);
    
    const mockIntent = new Intent(
      'stub-id-' + Date.now(),
      userId,
      goalTitle,
      goalDescription,
      metadata,
      new Date(),
      new Date(),
    );

    console.log('Intent created (stub - not saved to DB)');
    return mockIntent;
  }

  async updateIntent(
    intentId: string,
    goalTitle?: string,
    goalDescription?: string,
    metadata?: Record<string, any>,
  ): Promise<Intent> {
    console.log(`Updating intent ${intentId}`);
    
    const mockIntent = new Intent(
      intentId,
      'stub-user-id',
      goalTitle || 'Updated Goal Title',
      goalDescription || 'Updated Goal Description',
      metadata || { updated: true },
      new Date(Date.now() - 86400000),
      new Date(),
    );

    console.log('Intent updated (stub - not saved to DB)');
    return mockIntent;
  }

  async deleteIntent(intentId: string): Promise<{ success: boolean; message: string }> {
    console.log(`Deleting intent ${intentId}`);
    
    console.log('Intent deleted (stub - not removed from DB)');
    return {
      success: true,
      message: `Intent ${intentId} deleted successfully`,
    };
  }

  async getIntentById(intentId: string): Promise<Intent> {
    console.log(`Fetching intent ${intentId}`);
    
    const mockIntent = new Intent(
      intentId,
      'stub-user-id',
      'Sample Goal Title',
      'Sample Goal Description',
      { sample: true },
      new Date(Date.now() - 86400000),
      new Date(),
    );

    console.log('Intent fetched (stub - not from DB)');
    return mockIntent;
  }

  async getIntentsByUserId(userId: string): Promise<Intent[]> {
    console.log(`Fetching intents for user ${userId}`);
    
    const mockIntents = [
      new Intent(
        'stub-id-1',
        userId,
        'First Goal',
        'Description of first goal',
        { priority: 'high' },
        new Date(Date.now() - 172800000),
        new Date(Date.now() - 86400000),
      ),
      new Intent(
        'stub-id-2',
        userId,
        'Second Goal',
        'Description of second goal',
        { priority: 'medium' },
        new Date(Date.now() - 86400000),
        new Date(),
      ),
    ];

    console.log(`Found ${mockIntents.length} intents for user (stub - not from DB)`);
    return mockIntents;
  }
}
