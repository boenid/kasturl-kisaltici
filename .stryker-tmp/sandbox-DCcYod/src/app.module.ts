// @ts-nocheck
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KisalticiService } from './kisaltici/kisaltici.service';
import { Url } from './kisaltici/url.entity';

@Module({
  imports: [
  	TypeOrmModule.forRoot({
  		type: 'postgres',
  		host: 'localhost',
  		port: 5432,
  		username: 'mostar',
  		password: 'viyanakapilari',
  		database: 'kast_url',
  		entities: [Url],
  		synchronize: true,
  	}),
  	TypeOrmModule.forFeature([Url]),
  ],
  controllers: [AppController],
  providers: [AppService, KisalticiService],
})
export class AppModule {}
