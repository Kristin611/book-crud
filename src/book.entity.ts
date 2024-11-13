import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    genre: string;

    @Column()
    price: string;
}

// Entity: In TypeORM (which NestJS uses for data management), an entity is a class that represents a database table. So, if you have a Book entity, it maps to a table in the database called Book (or whatever table name you specify). This entity defines the structure of the data, with fields like title, author, genre, and price corresponding to columns in the table.

// Repository: A repository is a TypeORM class that provides methods to interact with the database table represented by the entity. It’s a bit like a "data access object" (DAO) in other frameworks. The repository doesn’t contain the data itself but provides an interface to perform CRUD (Create, Read, Update, Delete) operations on the table.