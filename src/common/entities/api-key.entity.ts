import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class Apikeys {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  key: string;

  @Column()
  host: string;
}
