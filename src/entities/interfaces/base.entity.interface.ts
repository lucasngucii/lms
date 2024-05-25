export interface IBaseEntity {
   id: string;
   createDateTime: Date;
   lastChangedDateTime: Date;
   isActive: boolean;
   isArchived: boolean;
   createBy: string;
}