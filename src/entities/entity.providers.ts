import { AccountEntity } from './account.entity';
import { CourseContentEntity } from './courses/content.entity';
import { CourseEntity } from './courses/course.entity';
import { DetailAccountEntity } from './detailAccount.entity';
import { EnrollmentEntity } from './enrollment.entity';
import { KeyTokenEntity } from './keyToken.entity';
import { LoginHistoryEntity } from './loginHistory.entity';
import { CourseModuleEntity } from './courses/module.entity';
import { ProgresDetailsEntity } from './courses/progresDetail.entity';
import { RoleEntity } from './role.entity';
import { SessionEntity } from './session.entity';
import { CategoryEntity } from './courses/category.entity';
import { CourseProgressEntity } from './courses/progres.entity';

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
];
