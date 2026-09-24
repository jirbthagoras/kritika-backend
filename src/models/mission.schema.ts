import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MissionDocument = Mission & Document;

export enum MissionStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

@Schema({ timestamps: true })
export class Mission {
  @Prop({ type: Types.ObjectId, ref: 'Class', required: true })
  classId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Document', required: true })
  documentId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  teacherId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  brief: string;

  @Prop()
  learningGoal: string;

  @Prop()
  gradeLevel: string;

  @Prop()
  subject: string;

  @Prop({ enum: MissionStatus, default: MissionStatus.DRAFT })
  status: MissionStatus;

  @Prop()
  publishedAt: Date;

  @Prop()
  dueDate: Date;

  @Prop({ default: false })
  aiGenerated: boolean;

  @Prop({ default: true })
  requiresReview: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const MissionSchema = SchemaFactory.createForClass(Mission);
MissionSchema.index({ classId: 1 });
MissionSchema.index({ status: 1 });
MissionSchema.index({ teacherId: 1 });
