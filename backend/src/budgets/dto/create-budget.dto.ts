import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { BudgetType, MonthType, StatusType } from '../entities/budget.entity';

export class CreateBudgetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @Min(0)
  @IsPositive()
  @IsNumber()
  value: number;

  @IsEnum(MonthType)
  month: MonthType;

  @IsDate()
  expectedPaymentDate: Date;

  @IsDate()
  @IsOptional()
  effectivedPaymentDate: Date | null;

  @IsEnum(StatusType)
  status: StatusType;

  @IsEnum(BudgetType)
  type: BudgetType;
}
