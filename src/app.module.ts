import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    //config file is for reading .env variables
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'book-crud',
      entities: [Book],
      synchronize: true,
      logging: true
    }),
    // forFeature enables us to use entity in our code
    TypeOrmModule.forFeature([Book]) 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
