import { Table, Column, Model } from 'sequelize-typescript';




@Table({
    tableName: 'News',
    timestamps: false
})
export class News extends Model {
    @Column({
      primaryKey: true
    })
    NewsId!: number;
  
    @Column
    NewsAddDate!: string;

    @Column
    NewsTitle!: string;

    @Column
    NewsContent!: string;

    @Column
    NewsStatus!: number;
  }
