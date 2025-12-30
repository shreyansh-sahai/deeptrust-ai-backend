import { Injectable, BadRequestException } from '@nestjs/common';
import { NetworkType, INetworkType } from '@domain/value-objects/network-type';
import { UserContactRepository } from '@infrastructure/repositories/user-contact.repository';

@Injectable()
export class NetworkService {
  constructor(private readonly userContactRepository: UserContactRepository) { }

  async saveNetwork(
    userId: string,
    contactIds: string[],
    networkType: string,
    networkTypeName: string,
    isCustom: boolean,
    networkTypeDescription?: string,
  ): Promise<{ message: string }> {
    // 1. Validation
    let bucketToSave = networkType;
    if (isCustom) {
      if (!networkTypeName) {
        throw new BadRequestException('networkTypeName is required for custom network');
      }
      bucketToSave = networkTypeName;
      if (networkTypeDescription) {
        bucketToSave += ':' + networkTypeDescription;
      }
    } else {
      const allowedTypes = NetworkType.getAllNetworkTypes().map((t) => t.type);
      if (!allowedTypes.includes(networkType)) {
        throw new BadRequestException(`Invalid network type: ${networkType}`);
      }
    }

    // 2. Update buckets in UserContact
    await this.userContactRepository.updateNetworkBuckets(userId, contactIds, bucketToSave);

    return {
      message: 'Network updated successfully',
    };
  }

  async getNetworkTypes(): Promise<INetworkType[]> {
    return NetworkType.getAllNetworkTypes();
  }

  async getMyNetworks(userId: string): Promise<{ networkType: string; networkTypeName: string; contactIds: string[] }[]> {
    const userContacts = await this.userContactRepository.findAllByUserId(userId);

    const networkMap = new Map<string, string[]>();

    userContacts.forEach((uc) => {
      uc.buckets.forEach((bucket) => {
        if (!networkMap.has(bucket)) {
          networkMap.set(bucket, []);
        }
        networkMap.get(bucket)!.push(uc.contactId);
      });
    });

    const result: { networkType: string; networkTypeName: string, networkTypeDescription?: string; contactIds: string[], isCustom: boolean }[] = [];
    networkMap.forEach((contactIds, bucketValue) => {
      const predefinedType = NetworkType.findTypeByValue(bucketValue);
      if (predefinedType) {
        result.push({
          networkType: bucketValue,
          networkTypeName: predefinedType.name,
          networkTypeDescription: predefinedType.description,
          contactIds,
          isCustom: false
        });
      } else {
        const [networkTypeName, networkTypeDescription] = bucketValue.split(':');
        result.push({
          networkType: networkTypeName,
          networkTypeName,
          networkTypeDescription,
          contactIds,
          isCustom: true
        });
      }
    });

    return result;
  }

  async deleteNetwork(userId: string, networkType: string, networkTypeName: string): Promise<{ message: string }> {

    const bucketValueToRemove = networkType === 'custom' ? networkTypeName : networkType;

    await this.userContactRepository.removeFromAllBuckets(userId, bucketValueToRemove);

    return {
      message: 'Network removed successfully',
    };
  }
}
