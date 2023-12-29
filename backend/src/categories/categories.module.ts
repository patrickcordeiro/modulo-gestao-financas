import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Budget } from 'src/budgets/entities/budget.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Budget])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
