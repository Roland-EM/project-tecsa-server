"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const bcrypt = require("bcryptjs");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async onModuleInit() {
    }
    async create(createUserDto) {
        const existingUser = await this.userModel.findOne({
            $or: [{ email: createUserDto.email }, { username: createUserDto.username }],
        });
        if (existingUser) {
            throw new common_1.ConflictException('User with this email or username already exists');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = new this.userModel({
            ...createUserDto,
            passwordHash: hashedPassword,
        });
        return user.save();
    }
    async findAll() {
        return this.userModel.find().select('-passwordHash').exec();
    }
    async findOne(id) {
        const user = await this.userModel.findOne({ id }).select('-passwordHash').exec();
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email }).exec();
    }
    async findByUsername(username) {
        return this.userModel.findOne({ username }).exec();
    }
    async update(id, updateUserDto) {
        const updateData = {};
        Object.keys(updateUserDto).forEach(key => {
            if (key !== 'password') {
                updateData[key] = updateUserDto[key];
            }
        });
        if (updateUserDto.password) {
            updateData.passwordHash = await bcrypt.hash(updateUserDto.password, 10);
        }
        const user = await this.userModel.findOneAndUpdate({ id }, updateData, { new: true }).select('-passwordHash').exec();
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }
    async remove(id) {
        const result = await this.userModel.deleteOne({ id }).exec();
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
    }
    async validatePassword(user, password) {
        console.log(`Validating password for user: ${user.username}`);
        if (!user.passwordHash) {
            console.error('Password hash is missing for user:', user.username);
            return false;
        }
        console.log(`Password hash in DB: ${user.passwordHash.substring(0, 20)}...`);
        try {
            const plainTextPassword = password.toString();
            const storedHash = user.passwordHash.toString();
            const isValid = await bcrypt.compare(plainTextPassword, storedHash);
            console.log(`Password validation result: ${isValid}`);
            return isValid;
        }
        catch (error) {
            console.error('Error validating password:', error);
            console.error('Password:', password);
            console.error('Hash:', user.passwordHash);
            return false;
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map