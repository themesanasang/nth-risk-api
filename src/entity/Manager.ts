import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToMany,
    ManyToOne
  } from "typeorm";
  import { IsNotEmpty } from "class-validator";
  import {RUser} from "./User";
  
  @Entity()
  @Unique(["username"])
  export class RManager {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => RUser)
    @JoinColumn({ name: "username" })
    @IsNotEmpty()
    username: string;
  
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