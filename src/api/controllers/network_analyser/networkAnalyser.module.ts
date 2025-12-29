import { Module } from "@nestjs/common";
import { EmbedService } from "@application/network_analyser/services/embed.service";

@Module({
    imports: [],
    controllers: [],
    providers: [EmbedService],
    exports: [EmbedService],
})
export class NetworkAnalyserModule { }