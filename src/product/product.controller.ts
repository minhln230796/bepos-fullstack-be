import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductFilterDto } from './validations/product-filter.dto';

@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async list(@Query() query: ProductFilterDto) {
    return await this.productService.list(query);
  }

  @Get('/:id')
  async detail(@Param('id') id: string) {
    return await this.productService.detail(id);
  }
}
