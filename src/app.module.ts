import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KisalticiService } from './kisaltici/kisaltici.service';
import { Url } from './kisaltici/url.entity';
import { KisalticiController } from './kisaltici/kisaltici.controller';

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
  	ServeStaticModule.forRoot({
  	  rootPath: join(__dirname, '..', 'client'), // 'client' klasörüne bakacak
  	}),
  ],
  controllers: [AppController, KisalticiController],
  providers: [AppService, KisalticiService],
})
export class AppModule {}
