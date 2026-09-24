import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SubmissionDocument = Submission & Document;

export enum SubmissionStatus {
  IN_PROGRESS = 'in_progress',
  SUBMITTED = 'submitted',
  NEEDS_REVISION = 'needs_revision',
  COMPLETED = 'completed',
}

@Schema({ timestamps: true })
export class Submission {
  @Prop({ type: Types.ObjectId, ref: 'Mission', required: true })
  missionId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  studentId: Types.ObjectId;

  @Prop({ enum: SubmissionStatus, default: SubmissionStatus.IN_PROGRESS })
  status: SubmissionStatus;

  @Prop({ default: 0 })
  score: number;

  @Prop({ default: 100 })
  maxScore: number;

  @Prop({ default: 1 })
  attemptCount: number;

  @Prop()
  submittedAt: Date;

  @Prop()
  completedAt: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);
SubmissionSchema.index({ missionId: 1, studentId: 1 }, { unique: true });
SubmissionSchema.index({ missionId: 1 });
SubmissionSchema.index({ studentId: 1 });
SubmissionSchema.index({ status: 1 });
