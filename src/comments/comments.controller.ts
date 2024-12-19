import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { createReaderDto } from 'src/readers/dto/create-reader-dto';
import { CreateCommentDto } from 'src/readers/entities/reader.entity';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private commentsServices: CommentsService) {}

  /***create newComment */
  @Post()
  createComment(@Body() body: createReaderDto) {
    return this.commentsServices.createComment(body);
  }
  /**
   * get all comments
   */
  @Get()
  getAllComments() {
    return this.commentsServices.getAllComments();
  }

  /*****get comment by id */
  @Get(':id')
  getCommentsByUserId(@Param('id', ParseIntPipe) id: number) {
    return id;
  }

  /****Update Comment */
  @Put(':id')
  /**
   * Updates a comment with the given id
   * @param id The id of the comment to update
   * @param body The new values for the comment
   * @returns The updated comment
   */
  updateComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateCommentDto,
  ) {
    return this.commentsServices.updateComment(id, body);
  }

  /***delete comment */
  @Delete(':id')
  /**
   * Deletes a comment with the specified id.
   * @param id The id of the comment to be deleted.
   * @returns A message indicating successful deletion.
   */
  deleteComment(@Param('id', ParseIntPipe) id: number) {
    return this.commentsServices.deleteComment(id);
  }
}
