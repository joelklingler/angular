import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product: IProduct;

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) {
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProducts().subscribe(x => {
      this.product = x.find(e => e.productId == id);
      console.log(this.product)
    });
  }

}
