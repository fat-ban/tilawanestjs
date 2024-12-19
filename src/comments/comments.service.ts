import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from 'src/readers/entities/reader.entity';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  /***create newComment**/
  public async createComment(body: CreateCommentDto) {
    const newComment = this.commentsRepository.create(body);
    return await this.commentsRepository.save(newComment);
  }
  /***get all comments */
  public async getAllComments() {
    return await this.commentsRepository.find();
  }
  /***get comment by userid */
  public async getCommentsByUserId(id: number) {
    const comment = await this.commentsRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException('لا يوجد تعليقات');
    }
    return comment;
  }
  /***UPDATE COMMENTS */
  public async updateComment(id: number, body: CreateCommentDto) {
    const comment = await this.getCommentsByUserId(id);
    comment.text = body.text ?? comment.text;
  }
  /***delete Comment*/
  public async deleteComment(id: number) {
    const comment = await this.getCommentsByUserId(id);
    await this.commentsRepository.remove(comment);
    return { message: 'تم حدف التعليق بنجاح' };
  }
}
