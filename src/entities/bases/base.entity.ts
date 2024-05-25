import { IBaseEntity } from '../interfaces';
import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity<T> implements IBaseEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @CreateDateColumn({ type: 'timestamptz' })
   createDateTime: Date;
   @CreateDateColumn({ type: 'timestamptz' })
   lastChangedDateTime: Date;

   @Column({ type: 'varchar', default: '' })
   createBy: string;

   @Column({ type: 'boolean', default: false })
   isActive: boolean;

   @Column({ type: 'boolean', default: false })
   isArchived: boolean;

   constructor(entity: Partial<T>) {
      Object.assign(this, entity);
   }
}