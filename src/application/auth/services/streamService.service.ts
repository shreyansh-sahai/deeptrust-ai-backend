// stream.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Readable } from 'stream';
import { Config } from '@common/util/config';

@Injectable()
export class StreamService {

    async execute(request: any, token: string) {
        const stream = await this.callStreamApi(token, request);
        this.consumeStream(stream);
    }

    private async callStreamApi(cognito_access_token: string, request: any): Promise<Readable> {
        let requestData = {
            "integration_account_id": request.integration_account_id,
            "resource_type": request.resource_type,
            "sync_full_content": request.sync_full_content
        }
        const response = await axios.post(
            Config.STREAM_API_URL,
            requestData,
            {
                headers: {
                    Authorization: `Bearer ${cognito_access_token}`,
                    'Content-Type': 'application/json',
                },
                responseType: 'stream',
                timeout: 0,
            },
        );

        return response.data;
    }

    private consumeStream(stream: Readable) {
        stream.on('data', (chunk) => {
            // Keep this lightweight
            console.log(chunk.toString());
        });

        stream.on('end', () => {
            console.log('Stream finished');
        });

        stream.on('error', (err) => {
            console.error('Stream error', err);
        });
    }

}
