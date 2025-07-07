import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class ObjectIdPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
