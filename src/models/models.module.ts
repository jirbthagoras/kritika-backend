import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as schemas from './index';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: schemas.UserSchema },
      { name: 'Class', schema: schemas.ClassSchema },
      { name: 'ClassMember', schema: schemas.ClassMemberSchema },
      { name: 'Document', schema: schemas.DocumentSchema },
      { name: 'Mission', schema: schemas.MissionSchema },
      { name: 'MissionBlock', schema: schemas.MissionBlockSchema },
      { name: 'MissionEdge', schema: schemas.MissionEdgeSchema },
      { name: 'LogicTrap', schema: schemas.LogicTrapSchema },
      { name: 'Submission', schema: schemas.SubmissionSchema },
      { name: 'SubmissionChain', schema: schemas.SubmissionChainSchema },
      { name: 'SubmissionTrap', schema: schemas.SubmissionTrapSchema },
      { name: 'Feedback', schema: schemas.FeedbackSchema },
      { name: 'Badge', schema: schemas.BadgeSchema },
      { name: 'StudentBadge', schema: schemas.StudentBadgeSchema },
      { name: 'AuditLog', schema: schemas.AuditLogSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class ModelsModule {}