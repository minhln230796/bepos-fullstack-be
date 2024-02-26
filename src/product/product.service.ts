import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductFilterDto } from './validations/product-filter.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async list(data: ProductFilterDto) {
    const page = data.page || 1;
    const limit = data.limit || 10;
    const query = this.productRepository.createQueryBuilder();
    if (data.search_key) {
      const searchKey = `%${data.search_key}%`;
      query.where((qb) => {
        qb.where('name ILIKE :searchKey', {
          searchKey,
        }).orWhere('category ILIKE :searchKey', {
          searchKey,
        });
      });
    }
    const [result, total] = await query
      .skip(page)
      .take(limit)
      .orderBy('id', 'ASC')
      .getManyAndCount();

    return {
      result,
      total,
    };
  }

  async detail(id: string) {
    const detail = await this.productRepository.findOneBy({
      id: id,
    });
    return {
      detail,
    };
  }
}
