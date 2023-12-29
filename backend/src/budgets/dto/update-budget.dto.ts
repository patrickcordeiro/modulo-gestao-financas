import { PartialType } from '@nestjs/mapped-types';
import { CreateBudgetDto } from './create-budget.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';

export class UpdateBudgetDto extends PartialType(CreateBudgetDto) {
  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  category: Partial<Category>;
}
