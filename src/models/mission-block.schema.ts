import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MissionBlockDocument = MissionBlock & Document;

export enum MissionBlockType {
  CLAIM = 'claim',
  FACT = 'fact',
  CAUSE = 'cause',
  EFFECT = 'effect',
  EVIDENCE = 'evidence',
  DISTRACTOR = 'distractor',
}

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: false } })
export class MissionBlock {
  @Prop({ type: Types.ObjectId, ref: 'Mission', required: true })
  missionId: Types.ObjectId;

  @Prop({ enum: MissionBlockType, required: true })
  blockType: MissionBlockType;

  @Prop({ required: true })
  textContent: string;

  @Prop()
  evidenceSpanParagraph: number;

  @Prop()
  evidenceSpanSentence: number;

  @Prop()
  evidenceSpanText: string;

  @Prop({ default: false })
  isRequired: boolean;

  @Prop({ default: 0 })
  sortOrder: number;

  @Prop()
  createdAt: Date;
}

export const MissionBlockSchema = SchemaFactory.createForClass(MissionBlock);
MissionBlockSchema.index({ missionId: 1 });
MissionBlockSchema.index({ blockType: 1 });
