import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FeedbackDocument = Feedback & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: false } })
export class Feedback {
  @Prop({ type: Types.ObjectId, ref: 'Submission', required: true })
  submissionId: Types.ObjectId;

  @Prop()
  strength: string;

  @Prop()
  nextStep: string;

  @Prop()
  hint: string;

  @Prop({ default: false })
  aiGenerated: boolean;

  @Prop()
  createdAt: Date;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
FeedbackSchema.index({ submissionId: 1 });
