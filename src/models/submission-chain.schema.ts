import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SubmissionChainDocument = SubmissionChain & Document;

export enum SubmissionChainSlotType {
  CLAIM = 'claim',
  EVIDENCE = 'evidence',
  CAUSE = 'cause',
  EFFECT = 'effect',
}

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: false } })
export class SubmissionChain {
  @Prop({ type: Types.ObjectId, ref: 'Submission', required: true })
  submissionId: Types.ObjectId;

  @Prop({ enum: SubmissionChainSlotType, required: true })
  slotType: SubmissionChainSlotType;

  @Prop({ type: Types.ObjectId, ref: 'MissionBlock', required: true })
  blockId: Types.ObjectId;

  @Prop({ default: 0 })
  sortOrder: number;

  @Prop()
  createdAt: Date;
}

export const SubmissionChainSchema = SchemaFactory.createForClass(SubmissionChain);
SubmissionChainSchema.index({ submissionId: 1 });
SubmissionChainSchema.index({ blockId: 1 });
