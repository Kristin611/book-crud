import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';

// dto = data transfer object
export class BookDto {
  title: string;
  author: string;
  genre: string;
  price: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get('book')
  async getBooks() {
    return await this.appService.getBooks()
  }

  @Get('book/:id')
  async getBook(@Param('id') id: string) {
    return await this.appService.getBook(parseInt(id))
  }

  @Post('book')
  async createBook(@Body() book: BookDto) {
    // console.log('Book', book)
    return await this.appService.createBook(book)
  }

  @Put('book/:id')
  async updateBook(@Body() book: BookDto, @Param('id') id: number) {
    // console.log('book', book);
    // console.log('id', id);
    return await this.appService.updateBook(id, book)
  }

  @Delete('book/:id')
  async deleteBook(@Param('id') id: number) {
    return await this.appService.deleteBook(id)
  }
}
