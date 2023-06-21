import { Table, Column, Model } from 'sequelize-typescript';

@Table({
    tableName: 'News',
    timestamps: false
})
export class News extends Model {
    @Column({
      primaryKey: true
    })
    news_id!: number;
  
    @Column
    news_add_date!: Date;

    @Column
    news_title!: string;
  }
