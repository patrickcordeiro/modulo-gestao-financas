import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { Budget } from './entities/budget.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BudgetsService {
  constructor(
    @InjectRepository(Budget)
    private readonly budgetRepository: Repository<Budget>,
  ) {}

  create(createBudgetDto: CreateBudgetDto): Promise<Budget> {
    try {
      const budget = this.budgetRepository.create({
        name: createBudgetDto.name,
        description: createBudgetDto.description,
        value: createBudgetDto.value,
        month: createBudgetDto.month,
        expectedPaymentDate: createBudgetDto.expectedPaymentDate,
        effectivedPaymentDate: createBudgetDto.effectivedPaymentDate,
        status: createBudgetDto.status,
        type: createBudgetDto.type,
      });
      return this.budgetRepository.save(budget);
    } catch (error) {
      console.error('Erro na criação de orçamento', error);
    }
  }

  findAll(): Promise<Budget[]> {
    return this.budgetRepository.find({
      relations: {
        category: true,
      },
    });
  }

  findOne(id: string): Promise<Budget> {
    const budget = this.budgetRepository.findOne({
      where: { id },
      relations: { category: true },
    });

    if (!budget) {
      throw new NotFoundException(`Budget ${id} not found`);
    }

    return budget;
  }

  async update(id: string, updateBudgetDto: UpdateBudgetDto): Promise<Budget> {
    const budget = await this.budgetRepository.preload({
      id: id,
      isActive: updateBudgetDto.isActive,
      category: updateBudgetDto.category,
    });

    if (!budget) {
      throw new NotFoundException(`Budget ${id} not found`);
    }

    return this.budgetRepository.save(budget);
  }

  async remove(id: string): Promise<string> {
    const budget = await this.findOne(id);

    if (!budget) {
      throw new NotFoundException(`Budget ${id} not found`);
    }

    this.budgetRepository.remove(budget);

    return 'Budget deleted!';
  }
}
