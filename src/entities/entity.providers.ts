import { AccountEntity } from './account.entity';
import { CategoryEntity } from './category.entity';
import { CourseContentEntity } from './content.entity';
import { CourseEntity } from './course.entity';
import { DetailAccountEntity } from './detailAccount.entity';
import { EnrollmentEntity } from './enrollment.entity';
import { KeyTokenEntity } from './keyToken.entity';
import { LoginHistoryEntity } from './loginHistory.entity';
import { CourseProgressEntity } from './progres.entity';
import { ProgresDetailsEntity } from './progresDetail.entity';
import { RoleEntity } from './role.entity';
import { SessionEntity } from './session.entity';

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
];
