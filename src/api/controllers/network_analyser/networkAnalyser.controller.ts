import { NetworkAnalyserService } from "@application/network_analyser/services/network_analyser.service";
import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "@common/guards/jwt-auth.guard";

@ApiTags('network-analyser')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({
    path: 'network-analyser',
    version: '1',
})
export class NetworkAnalyserController {
    constructor(private readonly networkAnalyserService: NetworkAnalyserService) { }

    @Get('analyze-network/:intentId')
    async analyzeNetwork(@Param('intentId') intentId: string) {
        return this.networkAnalyserService.analyzeNetwork(intentId);
    }
}