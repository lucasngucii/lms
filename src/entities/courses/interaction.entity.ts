import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../bases';
import { IInteractionEntity } from '../interfaces';

@Entity({ name: 'course_interaction' })
export class InteractionEntity extends BaseEntity<InteractionEntity> implements IInteractionEntity {
   @Column({ type: 'varchar', name: 'interaction_type' })
   interactionType: string;

   @Column({ type: 'varchar', name: 'interaction_content' })
   interactionDate: Date;
}
