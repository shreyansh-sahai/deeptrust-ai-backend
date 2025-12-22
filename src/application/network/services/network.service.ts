import { Injectable } from '@nestjs/common';
import { NetworkType, INetworkType } from '@domain/value-objects/network-type';

@Injectable()
export class NetworkService {
  async saveNetwork(
    userId: string,
    contactId: string,
    networkType: string,
    buckets?: string[],
  ): Promise<{ message: string; data: any }> {
    console.log('=== Save Network Request ===');
    console.log('User ID:', userId);
    console.log('Contact ID:', contactId);
    console.log('Network Type:', networkType);
    console.log('Buckets:', buckets);
    console.log('Network type will be added to UserContact buckets array');
    console.log('(stub - not saved to DB)');

    return {
      message: 'Network saved successfully (stub)',
      data: {
        contactId,
        networkType,
        buckets: buckets || [],
        updatedAt: new Date(),
      },
    };
  }

  async getNetworkTypes(): Promise<INetworkType[]> {
    console.log('Fetching all network types');
    const networkTypes = NetworkType.getAllNetworkTypes();
    console.log(`Returning ${networkTypes.length} network types`);
    return networkTypes;
  }

  async getBucketsByUserId(userId: string): Promise<string[]> {
    console.log(`Fetching buckets for user: ${userId}`);
    
    const mockBuckets = [
      'executive-team',
      'board-members',
      'investors',
      'key-clients',
    ];
    
    console.log(`Returning ${mockBuckets.length} buckets (stub data)`);
    return mockBuckets;
  }
}
