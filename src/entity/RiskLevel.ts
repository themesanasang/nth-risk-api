import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
  import { IsNotEmpty } from "class-validator";
  
  @Entity()
  @Unique(["level"])
  export class RRiskLevel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    level: string;

    @Column()
    @IsNotEmpty()
    detail: string;
  
    @Column({ type: 'boolean', default: true })
    @IsNotEmpty()
    isActive: boolean;
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
  }