import { AccountEntity, DetailAccountEntity } from './accounts';
import { KeyTokenEntity, LoginHistoryEntity, RoleEntity, SessionEntity } from './auth';
import {
   CategoryEntity,
   CourseContentEntity,
   CourseEntity,
   CourseProgressEntity,
   EnrollmentEntity,
   ProgresDetailsEntity,
   CourseModuleEntity,
   CourseLessionEntity,
} from './courses';


export const entities = [
   AccountEntity,
   RoleEntity,
   SessionEntity,
   KeyTokenEntity,
   LoginHistoryEntity,
   DetailAccountEntity,
   EnrollmentEntity,
   CourseEntity,
   CategoryEntity,
   CourseProgressEntity,
   ProgresDetailsEntity,
   CourseContentEntity,
   CourseModuleEntity,
   CourseLessionEntity,
];
