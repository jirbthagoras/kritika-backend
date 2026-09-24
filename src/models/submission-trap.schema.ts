import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SubmissionTrapDocument = SubmissionTrap & Document;

export enum SubmissionTrapStudentAnswer {
  SUPPORTED = 'supported',
  NOT_ENOUGH_EVIDENCE = 'not_enough_evidence',
  CONTRADICTED = 'contradicted',
  NOT_MENTIONED = 'not_mentioned',
}

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: false } })
export class SubmissionTrap {
  @Prop({ type: Types.ObjectId, ref: 'Submission', required: true })
  submissionId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'LogicTrap', required: true })
  trapId: Types.ObjectId;

  @Prop({ enum: SubmissionTrapStudentAnswer, required: true })
  studentAnswer: SubmissionTrapStudentAnswer;

  @Prop({ default: false })
  isCorrect: boolean;

  @Prop()
  createdAt: Date;
}

export const SubmissionTrapSchema = SchemaFactory.createForClass(SubmissionTrap);
SubmissionTrapSchema.index({ submissionId: 1 });
SubmissionTrapSchema.index({ trapId: 1 });
