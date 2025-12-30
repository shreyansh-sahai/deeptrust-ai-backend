import { Module, forwardRef } from "@nestjs/common";
import { EmbedService } from "@application/network_analyser/services/embed.service";
import { NetworkAnalyserController } from "./networkAnalyser.controller";
import { InfrastructureModule } from "@infrastructure/infrastructure.module";
import { NetworkAnalyserService } from "@application/network_analyser/services/network_analyser.service";
import { IntentModule } from "../intent/intent.module";
import { IdentitiesModule } from "../identities/identities.module";
@Module({
    imports: [InfrastructureModule, forwardRef(() => IntentModule), forwardRef(() => IdentitiesModule)],
    controllers: [NetworkAnalyserController],
    providers: [EmbedService, NetworkAnalyserService],
    exports: [EmbedService, NetworkAnalyserService],
})
export class NetworkAnalyserModule { }