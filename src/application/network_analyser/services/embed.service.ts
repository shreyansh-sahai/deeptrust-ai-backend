import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { Config } from '../../../common/util/config';

@Injectable()
export class EmbedService {
    private openai: OpenAI;
    private readonly logger = new Logger(EmbedService.name);

    constructor() {
        const apiKey = Config.OPENAI_API_KEY;

        // Config.get throws error if key is missing, so this check is technically redundant 
        // but kept for explicit clarity if Config behavior changes or if we want custom logging here before throw.
        // However, Config.get will throw first.

        this.openai = new OpenAI({
            apiKey: apiKey,
        });
    }

    async getEmbedding(text: string): Promise<number[]> {
        try {
            const response = await this.openai.embeddings.create({
                model: 'text-embedding-3-small',
                input: text,
                encoding_format: 'float',
            });

            return response.data[0].embedding;
        } catch (error) {
            this.logger.error(`Failed to generate embedding: ${error.message}`, error.stack);
            throw error;
        }
    }
}
