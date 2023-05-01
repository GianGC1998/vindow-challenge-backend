import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import { Image } from './image';

@Entity()
export class News {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column()
  description: string;

  @Column()
  body: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Column((_) => Image)
  image: Image;
}
