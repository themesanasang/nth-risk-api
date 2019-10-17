import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
    getConnection
  } from "typeorm";
  import { Length, IsNotEmpty } from "class-validator";
  import * as bcrypt from "bcryptjs";
  import {RDepartment} from "./Department";
  
  @Entity()
  @Unique(["username"])
  export class RUser {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    @Length(4)
    username: string;
  
    @Column()
    @Length(4, 100)
    password: string;

    @Column()
    fullname: string;

    @Column()
    email: string;

    @ManyToOne(() => RDepartment)
    @JoinColumn({ name: "department" })
    department: RDepartment;
  
    @Column()
    @IsNotEmpty()
    role: string;
  
    @Column({ type: 'boolean', default: true })
    @IsNotEmpty()
    isActive: boolean;
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;


    //get user all
    getUserAll() {
      return getConnection()
      .createQueryBuilder()
      .select(["u", "r_department.department", "r_workgroup.workgroup"])
      .from(RUser, "u")
      .leftJoin("u.department", "r_department")
      .leftJoin("r_department.workgroup", "r_workgroup")
      .orderBy("u.id", "ASC")
      .getMany();
    }
  


    hashPassword() {
      this.password = bcrypt.hashSync(this.password, 8);
    }
  


    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
      return bcrypt.compareSync(unencryptedPassword, this.password);
    }
  }