import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LogicTrapDocument = LogicTrap & Document;

export enum LogicTrapCorrectAnswer {
  SUPPORTED = 'supported',
  NOT_ENOUGH_EVIDENCE = 'not_enough_evidence',
  CONTRADICTED = 'contradicted',
  NOT_MENTIONED = 'not_mentioned',
}

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: false } })
export class LogicTrap {
  @Prop({ type: Types.ObjectId, ref: 'Mission', required: true })
  missionId: Types.ObjectId;

  @Prop({ required: true })
  textContent: string;

  @Prop({ enum: LogicTrapCorrectAnswer, required: true })
  correctAnswer: LogicTrapCorrectAnswer;

  @Prop()
  explanation: string;

  @Prop({ default: 0 })
  sortOrder: number;

  @Prop()
  createdAt: Date;
}

export const LogicTrapSchema = SchemaFactory.createForClass(LogicTrap);
LogicTrapSchema.index({ missionId: 1 });
