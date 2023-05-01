import { Column } from 'typeorm';

export class Image {
  @Column()
  url: string;
}
