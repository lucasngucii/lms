import { Logger } from '@nestjs/common';
import { EntityManager, EntityTarget, Repository } from 'typeorm';

export class BaseRepository<T> extends Repository<T> {
   protected readonly logger: Logger;
   private entity: EntityTarget<T>;

   constructor(entity: EntityTarget<T>, manager: EntityManager) {
      super(entity, manager);
      this.entity = entity;
      this.logger = new Logger(BaseRepository.name);
   }
//    async findById(id: number | string): Promise<T | undefined> {
//       try {
//       } catch (error) {
//          this.logger.verbose(`Failed to find ${BaseRepository.name} with id: ${id}`);
//       }
//    }
}
