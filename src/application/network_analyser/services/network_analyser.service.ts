import { Injectable } from "@nestjs/common";
import { IntentService } from '@application/intent/services/intent.service';
import { IdentityService } from "@application/services/identity.service";

@Injectable()
export class NetworkAnalyserService {
    constructor(
        private readonly intentService: IntentService,
        private readonly identityService: IdentityService) { }

    async analyzeNetwork(intentId: string) {
        const intent = await this.intentService.getIntentById(intentId);

        const embedding = intent.embedding;
        if (!embedding) {
            throw new Error('Intent embedding not found');
        }
        const identity = await this.identityService.networkAnalyser(intent.userId, embedding);

        return identity;
    }
}