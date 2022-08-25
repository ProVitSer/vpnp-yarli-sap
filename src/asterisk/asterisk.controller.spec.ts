import { Test, TestingModule } from '@nestjs/testing';
import { AsteriskController } from './asterisk.controller';

describe('AsteriskController', () => {
  let controller: AsteriskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AsteriskController],
    }).compile();

    controller = module.get<AsteriskController>(AsteriskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
