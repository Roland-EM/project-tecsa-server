import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/schemas/user.schema';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByUsername(username);
    console.log(`Attempting to validate user: ${username}`);
    if (!user) {
      console.log('User not found');
      return null;
    }
    
    let isValid = false;
    try {
      isValid = await this.usersService.validatePassword(user, password);
    } catch (error) {
      console.error('Error during password validation:', error);
      return null;
    }
    
    console.log(`Password validation result: ${isValid}`);
    
    if (isValid) {
      return user;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      console.log(`Login failed for user: ${loginDto.username} - Invalid credentials`);
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      console.log('Login failed: Account is deactivated');
      throw new UnauthorizedException('Account is deactivated');
    }

    const payload = { username: user.username, sub: user.id, role: user.role };
    console.log(`Login successful for user: ${user.username}, role: ${user.role}`);
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        theme: user.theme,
      },
    };
  }

  async refresh(user: User) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}