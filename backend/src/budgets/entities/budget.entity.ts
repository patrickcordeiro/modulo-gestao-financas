import { Category } from 'src/categories/entities/category.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';

export enum MonthType {
  JANEIRO = 'Janeiro',
  FEVEREIRO = 'Fevereiro',
  MARCO = 'Março',
  ABRIL = 'Abril',
  MAIO = 'Maio',
  JUNHO = 'Junho',
  JULHO = 'Julho',
  AGOSTO = 'Agosto',
  SETEMBRO = 'Setembro',
  OUTUBRO = 'Outubro',
  NOVEMBRO = 'Novembro',
  DEZEMBRO = 'Dezembro',
}

export enum StatusType {
  PENDENTE = 'Pendente',
  A_RECEBER = 'A receber',
  EM_ATRASO = 'Em atraso',
  PAGO = 'Pago',
  RECEBIDO = 'Recebido',
  CANCELADO = 'Cancelado',
}

export enum BudgetType {
  RECEITA = 'Receita',
  DESPESA = 'Despesa',
}

@Entity({ name: 'budget' })
export class Budget extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', default: '' })
  name: string;

  @Column({ name: 'description', type: 'varchar', length: 50, nullable: true })
  description: string;

  @Column({ name: 'value', type: 'decimal', scale: 2 })
  value: number;

  @Column({
    type: 'enum',
    enum: MonthType,
  })
  month: MonthType;

  @Column({
    name: 'expected_payment_date',
    type: 'timestamptz',
  })
  expectedPaymentDate: Date;

  @Column({
    name: 'effectived_payment_date',
    type: 'timestamptz',
    nullable: true,
  })
  effectivedPaymentDate: Date;

  @Column({
    type: 'enum',
    enum: StatusType,
    default: StatusType.PENDENTE,
  })
  status: StatusType;

  @Column({
    type: 'enum',
    enum: BudgetType,
  })
  type: BudgetType;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => Category, (category) => category.budgets)
  @JoinColumn({ name: 'id_category' })
  category: Relation<Category>;
}
