import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Action, User } from './entity';
import { AppController } from './app.controller';
import { UserService } from './user.service';
import ActionService from './action.service';
import { config } from 'dotenv';
import { parse } from 'pg-connection-string';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

config();

const dbUrl = process.env.POSTGRES_URL;
if (!dbUrl) {
  throw new Error('Database connection URL not set in environment variables.');
}

const connectionOptions = parse(dbUrl);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: connectionOptions.host,
      port: parseInt(connectionOptions.port, 10),
      username: connectionOptions.user,
      password: connectionOptions.password,
      database: connectionOptions.database,
      ssl: { rejectUnauthorized: false },
      entities: [Action, User],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Action, User]),
  ],
  controllers: [AppController],
  providers: [UserService, ActionService],
})
export class AppModule {
  configureSwagger(app) {
    const config = new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription('The API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
}
