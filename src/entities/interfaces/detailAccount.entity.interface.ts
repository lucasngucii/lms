import { IBaseEntity } from './base.entity.interface';

export interface IDetailAccount extends IBaseEntity {
   fullName: string;
   birthDate: Date;
   gender: string;
   avatar: string;
   phone: string;
   bio: string;
}