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
  @Unique(["workgroup"])
  export class RWorkgroup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    workgroup: string;
  
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