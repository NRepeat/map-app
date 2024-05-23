import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity({ name: "route" })
export class Route {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  route_id: string;
  @Column({ type: "varchar" })
  name: string;
  @Column({ type: "bigint" })
  totalDistance: number;
  @Column({ type: "json", nullable: true })
  options: string;
  @Column({ type: "boolean" })
  optimized: boolean;
  @Column({ type: "json", default: [] })
  route_place_data: string;
  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: User;
}
