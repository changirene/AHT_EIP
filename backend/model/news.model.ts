import { Table, Column, Model } from 'sequelize-typescript';
import { DataTypes, TinyIntegerDataType } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';


@Table({
    tableName: 'News',
    timestamps: false
})
export class News extends Model {
    @Column({
      primaryKey: true,
      autoIncrement: true
    })
    NewsId!: number;
  
    @Column({
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    })
    NewsAddDate!: string;

    @Column
    NewsTitle!: string;

    @Column
    NewsContent!: string;

    @Column
    NewsStatus!: number;
  }






