import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get('plants')
  seedPlants() {
    return this.seedService.executeSeedPlants();
  }
}