// @ts-nocheck
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
@Entity()
export class Url {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  asilUrl: string;
  @Column({
    nullable: true
  })
  kisaKod: string;
  @CreateDateColumn()
  createdAt: Date;
}