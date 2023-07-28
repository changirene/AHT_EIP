import { Table, Column, Model } from 'sequelize-typescript';



@Table({
    tableName: 'Member',
    timestamps: false
})
export class Member extends Model {
    @Column({
      primaryKey: true,
      autoIncrement: true
    })
    member_id!: number

    @Column({
      allowNull: false
    })
    account!: string;
  
    @Column({
      allowNull: false
    })
    password!: string;

  }






