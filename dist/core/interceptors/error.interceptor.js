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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const logger_service_1 = require("../logger.service");
let ErrorInterceptor = class ErrorInterceptor {
    constructor(logger) {
        this.logger = logger;
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.catchError)((error) => {
            this.logger.error(`Error occurred: ${error.message}`, error.stack, 'ErrorInterceptor');
            if (error instanceof common_1.HttpException) {
                return (0, rxjs_1.throwError)(() => error);
            }
            return (0, rxjs_1.throwError)(() => new common_1.HttpException('Internal server error', common_1.HttpStatus.INTERNAL_SERVER_ERROR));
        }));
    }
};
exports.ErrorInterceptor = ErrorInterceptor;
exports.ErrorInterceptor = ErrorInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_service_1.LoggerService])
], ErrorInterceptor);
//# sourceMappingURL=error.interceptor.js.map