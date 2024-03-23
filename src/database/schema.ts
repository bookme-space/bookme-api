import { json, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const place = pgTable('Place', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  description: text('description').notNull(),
  address: json('address').notNull(),
  hoursOfWork: json('hoursOfWork').notNull(),
  seats: json('seats'),
  gallery: json('gallery'),
  tags: json('tags'),
});

export const schema = { place };
