import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { BookDto } from './app.controller';

// defining a TS type, BookItem, which serves as a blueprint for book objects. In JS this may be represented by an object literal. It ensures that the object passed to createBook has all the required properties (title, author, genre, price). Book item only provides type safety within TS.
// this is typically defined in controller
// type BookDto = {
//   title: string;
//   author: string;
//   genre: string;
//   price: number;
// }

@Injectable()
export class AppService {
  // constructor uses injectrepository to inject the bookRepository, which allows us to access the db table for Book records. bookRepo is private class property meanining no other classes or instances outside AppService cann directly access bookRepository.
  constructor(@InjectRepository(Book) private bookRepository: Repository<Book>,
){}
  getHello(): string {
    return 'Hello America!';
  }

  async getBooks() {
    return await this.bookRepository.find({
      order: {
        id: 'ASC'
      }
    })
  }

  async getBook(id: number) {
    return await this.bookRepository.findOneBy({id});
  }

  // the createBook method accepts a BookItem object and creates a new record in the Book table
  async createBook(book: BookDto) {
    console.log('Book', book)
    // typeorm's create method to initialize a new book entity from the book object being passed in
    await this.bookRepository.save(book);
    return await this.getBooks();
  }

  //if we want to create a new book and return all of the books back with new book included
  // async createBook(book: BookDto) {
  //   console.log('Book', book)
  //   await this.bookRepository.save(book);
  //   return await this.getBooks();
  // }

  async updateBook(id: number, book: BookDto) {
    await this.bookRepository.update(id, book)
    return await this.getBooks();
  }

  async deleteBook(id: number) {
    await this.bookRepository.delete(id);
    return await this.getBooks();
  }

}

// bookRepository is a Repository<Book>. This means it is a repository that lets you interact with the Book entity's data in the database. You can think of it as a gateway or a set of tools for accessing and manipulating the table data through the Book entity.

// The lowercase book here is a parameter that gets passed into the createBook method. It represents the data required to create a new Book record in the database. This data must match the BookItem type, which ensures it has properties like title, author, genre, and price.

// In practice, when you call createBook, you would pass an object that matches BookItem:
// appService.createBook({
//   title: "The Great Gatsby",
//   author: "F. Scott Fitzgerald",
//   genre: "Fiction",
//   price: 10.99,
// });

// BookItem: This is a TypeScript type that specifies the structure of the data you’re passing to the createBook method. It just ensures that any book object passed to createBook has the correct properties.
// Book Entity: This is a class that represents the actual database table and defines its structure at the database level. It typically has decorators to map its fields to database columns.

// The connection between BookItem and Book happens indirectly through the repository and TypeORM's behavior:
// 1. TypeORM's Repository create Method: When you pass the book object to this.bookRepository.create(book), TypeORM takes the properties in book and maps them to the fields in the Book entity.
// 2. Automatic Mapping: TypeORM’s create method takes plain JavaScript objects (like book, which matches BookItem) and creates an instance of the Book entity. If the Book entity has properties that match the BookItem properties, TypeORM knows how to populate the entity fields accordingly.

// Final note: When you pass an object with properties matching BookItem to this.bookRepository.create(book), TypeORM maps that object onto a Book entity behind the scenes. So, TypeORM is responsible for taking BookItem-shaped data and turning it into an instance of the Book entity that it can work with in the database.



