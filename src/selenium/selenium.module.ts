import { MiddlewareConsumer, Module } from '@nestjs/common';
import { SeleniumController } from './selenium.controller';
import { LoggerMiddleware } from '@app/middlewares/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '@app/logger/logger.module';
import { SeleniumWebdriver } from './selenium-webdriver';
import { SeleniumProvider } from './selenium.provider';
import { Login } from './providers/login';
import { ChangeExtensionStatus } from './providers/change-pbx-extension-status';
import { Logout } from './providers/logout';
import { DockerModule } from '@app/docker/docker.module';

@Module({
  imports: [ConfigModule, LoggerModule, DockerModule],
  providers: [SeleniumProvider, SeleniumWebdriver, Login, Logout, ChangeExtensionStatus],
  controllers: [SeleniumController]
})
export class SeleniumModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
        .apply(LoggerMiddleware)
        .forRoutes(SeleniumController);
  }
}
