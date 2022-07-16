import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  CacheInterceptor,
  UseInterceptors,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { Note } from './note.entity';
import { NotesService } from './notes.service';
import {Cache} from 'cache-manager';

@Controller('notes')
@UseInterceptors(CacheInterceptor)
export class NotesController {
  constructor(private notesService: NotesService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @Get()
  async findAll() {    
    let value = await this.cacheManager.get('note');
    if(value){
      return{
        dataFrom: 'In-memory Cache',
        note: value
      }
    }
    await this.cacheManager.set('note', this.notesService.getNotes(), {ttl: 300} );
    return {
      dataFrom: 'Database',
      note: this.notesService.getNotes()
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id) {
    return this.notesService.findOne(id);
  }

  @Post() create(@Body() note: Note) {
    return this.notesService.createNote(note);
  }

  @Patch(':id')
  async editNote(@Body() note: Note, @Param('id') id: number): Promise<Note> {
    const noteEdited = await this.notesService.editNote(id, note);
    return noteEdited;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id) {
    this.notesService.remove(id);
  }
}
