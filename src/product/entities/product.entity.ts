import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ColumnNumericTransformer } from '../../common/column-numeric.transformer';

@Entity('products')
export class Product {
  @PrimaryColumn({
    type: 'bigint',
  })
  id: string;

  @Column({
    type: 'text',
  })
  name: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'numeric',
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @Column({
    type: 'text',
  })
  category: string;
}
