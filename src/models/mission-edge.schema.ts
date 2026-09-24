import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MissionEdgeDocument = MissionEdge & Document;

export enum MissionEdgeRelationType {
  SUPPORTS = 'supports',
  EVIDENCE_FOR = 'evidence_for',
  CAUSES = 'causes',
  CONTRIBUTES_TO = 'contributes_to',
  CONTRADICTS = 'contradicts',
}

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: false } })
export class MissionEdge {
  @Prop({ type: Types.ObjectId, ref: 'Mission', required: true })
  missionId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'MissionBlock', required: true })
  fromBlockId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'MissionBlock', required: true })
  toBlockId: Types.ObjectId;

  @Prop({ enum: MissionEdgeRelationType, required: true })
  relationType: MissionEdgeRelationType;

  @Prop({ default: false })
  isRequired: boolean;

  @Prop({ default: 0 })
  sortOrder: number;

  @Prop()
  createdAt: Date;
}

export const MissionEdgeSchema = SchemaFactory.createForClass(MissionEdge);
MissionEdgeSchema.index({ missionId: 1 });
MissionEdgeSchema.index({ fromBlockId: 1 });
MissionEdgeSchema.index({ toBlockId: 1 });
