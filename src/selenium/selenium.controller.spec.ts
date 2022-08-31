import { Test, TestingModule } from '@nestjs/testing';
import { SeleniumController } from './selenium.controller';

describe('SeleniumController', () => {
  let controller: SeleniumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeleniumController],
    }).compile();

    controller = module.get<SeleniumController>(SeleniumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
