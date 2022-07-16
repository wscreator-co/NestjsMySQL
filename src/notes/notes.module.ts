import { CacheModule, Module, CacheInterceptor } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [CacheModule.register(), TypeOrmModule.forFeature([Note])],
  providers: [NotesService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    }],
  controllers: [NotesController],
})
export class NotesModule {}
