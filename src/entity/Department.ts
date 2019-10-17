import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Unique,
    JoinColumn,
    ManyToOne
  } from "typeorm";
  import { IsNotEmpty } from "class-validator";
  import {RWorkgroup} from "./Workgroup";
  
  @Entity()
  @Unique(["department"])
  export class RDepartment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    department: string;

    @ManyToOne(() => RWorkgroup)
    @JoinColumn({ name: "workgroup" })
    workgroup: RWorkgroup;
  
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