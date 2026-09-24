import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DocumentDocument = DocumentModel & Document;

@Schema({ timestamps: true })
export class DocumentModel {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  teacherId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  fileName: string;

  @Prop()
  filePath: string;

  @Prop()
  contentType: string;

  @Prop()
  fileSizeBytes: number;

  @Prop()
  rawText: string;

  @Prop({ default: 0 })
  paragraphCount: number;

  @Prop({ default: false })
  isProcessed: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const DocumentSchema = SchemaFactory.createForClass(DocumentModel);
DocumentSchema.index({ teacherId: 1 });
DocumentSchema.index({ isProcessed: 1 });
