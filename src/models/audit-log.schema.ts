import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AuditLogDocument = AuditLog & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: false } })
export class AuditLog {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  action: string;

  @Prop({ required: true })
  entityType: string;

  @Prop({ required: true })
  entityId: string;

  @Prop({ type: Object })
  oldValue: Record<string, any>;

  @Prop({ type: Object })
  newValue: Record<string, any>;

  @Prop()
  ipAddress: string;

  @Prop()
  createdAt: Date;
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);
AuditLogSchema.index({ userId: 1 });
AuditLogSchema.index({ entityType: 1, entityId: 1 });
AuditLogSchema.index({ createdAt: 1 });
