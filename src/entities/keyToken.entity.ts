import { Column, Entity } from 'typeorm';
import { BaseEntity } from './bases';
import { IKeyTokenEntity } from './interfaces';


@Entity({ name: 'key_token' })
export class KeyTokenEntity extends BaseEntity<KeyTokenEntity> implements IKeyTokenEntity {
   @Column({ type: 'varchar', default: '' })
   privateKey: string;

   @Column({ type: 'varchar', default: '' })
   publicKey: string;

   @Column({ type: 'varchar', default: '' })
   AccessToken: string;
}
