import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BadgeDocument = Badge & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: false } })
export class Badge {
  @Prop({ required: true, unique: true })
  badgeKey: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  iconUrl: string;

  @Prop()
  createdAt: Date;
}

export const BadgeSchema = SchemaFactory.createForClass(Badge);
BadgeSchema.index({ badgeKey: 1 });
