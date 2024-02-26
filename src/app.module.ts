import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ProductModule } from './product/product.module';

const dbUrl = new URL(
  'postgresql://test:dk8C01TOVECckjwVnWBI5g@vortex-okapi-6089.6xw.aws-ap-southeast-1.cockroachlabs.cloud:26257/products?sslmode=verify-full',
);
const routingId = dbUrl.searchParams.get('options');
dbUrl.searchParams.delete('options');
export const dataSourceOptions: DataSourceOptions = {
  type: 'cockroachdb',
  url: dbUrl.toString(),
  entities: ['dist/**/*.entity.js'],
  ssl: true,
  extra: {
    options: routingId,
  },
  timeTravelQueries: false,
};
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => dataSourceOptions,
      dataSourceFactory: async (options) => {
        return await new DataSource(options).initialize();
      },
    }),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
