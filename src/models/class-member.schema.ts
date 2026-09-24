import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ClassMemberDocument = ClassMember & Document;

@Schema({ timestamps: { createdAt: 'joinedAt', updatedAt: false } })
export class ClassMember {
  @Prop({ type: Types.ObjectId, ref: 'Class', required: true })
  classId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  studentId: Types.ObjectId;

  @Prop()
  joinedAt: Date;

  @Prop({ default: true })
  isActive: boolean;
}

export const ClassMemberSchema = SchemaFactory.createForClass(ClassMember);
ClassMemberSchema.index({ classId: 1, studentId: 1 }, { unique: true });
ClassMemberSchema.index({ classId: 1 });
ClassMemberSchema.index({ studentId: 1 });
