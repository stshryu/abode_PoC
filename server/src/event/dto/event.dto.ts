import { IsDate, IsString, IsArray, IsNotEmpty, ArrayNotEmpty, IsOptional, IsEmail, MinDate } from 'class-validator';
import { Exclude, Transform } from 'class-transformer';

export class EventDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsDate()
    @Transform(({ value }) => new Date(value))
    @MinDate(new Date())
    eventDate: Date;

    @IsOptional()
    @IsArray()
    @IsEmail({}, { each: true })
    attendees: string[]

    @Exclude()
    notified: boolean;

    _id: string
}
