import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type StudentBadgeDocument = StudentBadge & Document;

@Schema({ timestamps: { createdAt: 'earnedAt', updatedAt: false } })
export class StudentBadge {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  studentId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Badge', required: true })
  badgeId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Mission' })
  missionId: Types.ObjectId;

  @Prop()
  earnedAt: Date;
}

export const StudentBadgeSchema = SchemaFactory.createForClass(StudentBadge);
StudentBadgeSchema.index({ studentId: 1, badgeId: 1, missionId: 1 }, { unique: true });
StudentBadgeSchema.index({ studentId: 1 });
StudentBadgeSchema.index({ badgeId: 1 });
