import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ClassDocument = Class & Document;

@Schema({ timestamps: true })
export class Class {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  teacherId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  gradeLevel: string;

  @Prop()
  subject: string;

  @Prop({ required: true, unique: true })
  inviteCode: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
ClassSchema.index({ teacherId: 1 });
