import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { OnModuleInit } from '@nestjs/common';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async onModuleInit() {
    // Module initialization - no auto-creation of users
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({
      $or: [{ email: createUserDto.email }, { username: createUserDto.username }],
    });

    if (existingUser) {
      throw new ConflictException('User with this email or username already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = new this.userModel({
      ...createUserDto,
      passwordHash: hashedPassword,
    });

    return user.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-passwordHash').exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findOne({ id }).select('-passwordHash').exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updateData: any = {};
    
    // Copy all properties from updateUserDto except password
    Object.keys(updateUserDto).forEach(key => {
      if (key !== 'password') {
        updateData[key] = updateUserDto[key];
      }
    });
    
    // Handle password separately
    if (updateUserDto.password) {
      updateData.passwordHash = await bcrypt.hash(updateUserDto.password, 10);
    }

    const user = await this.userModel.findOneAndUpdate(
      { id },
      updateData,
      { new: true },
    ).select('-passwordHash').exec();

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async remove(id: string): Promise<void> {
    const result = await this.userModel.deleteOne({ id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    console.log(`Validating password for user: ${user.username}`);
    
    if (!user.passwordHash) {
      console.error('Password hash is missing for user:', user.username);
      return false;
    }
    
    console.log(`Password hash in DB: ${user.passwordHash.substring(0, 20)}...`);
    
    try {
      // Ensure we're using the correct parameters
      const plainTextPassword = password.toString();
      const storedHash = user.passwordHash.toString();
      
      const isValid = await bcrypt.compare(plainTextPassword, storedHash);
      console.log(`Password validation result: ${isValid}`);
      return isValid;
    } catch (error) {
      console.error('Error validating password:', error);
      console.error('Password:', password);
      console.error('Hash:', user.passwordHash);
      return false;
    }
  }
}