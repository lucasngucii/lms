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
import { AssignmentEntity } from './courses/assignment.entity';
import { ReviewEntity } from './courses/review.entity';
import { SubmissionEntity } from './courses/submission.entity';

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
   ReviewEntity,
   AssignmentEntity,
   SubmissionEntity,
];
