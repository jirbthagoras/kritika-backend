import { UserRole } from '../../models/user.schema';

export class AuthResponseDto {
  userId: string;
  email: string;
  fullName: string;
  role: UserRole;
}
