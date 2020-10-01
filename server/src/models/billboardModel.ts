import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("billboard")
class Billboard {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  title: string;

  @Column("text")
  title_extended: string;

  @Column("text")
  image_url: string;

  @Column("text")
  text: string;

  @Column("datetime")
  created_at: string;

  @Column("datetime")
  updated_at: string;
}

export default Billboard;
