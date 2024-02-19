import { IsDateString } from 'class-validator';

export class FilterEventsDto {
    @IsDateString()
    startDate: string;

    @IsDateString()
    endDate: string;
}
