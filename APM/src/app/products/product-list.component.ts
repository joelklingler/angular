import { Component, OnInit, OnChanges } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    constructor(private productService: ProductService) {
    }

    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    
    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value:string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => 
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    onRatingClicked(payload: string): void {
        this.pageTitle = `Product List: ${payload}`;
    }

    filteredProducts: IProduct[];

    private products: IProduct[];

      toggleImage(): void {
          this.showImage = !this.showImage;
      }

      ngOnInit(): void {
          this.productService.getProducts().subscribe(
              x => {
                  this.products = x;
                  this.filteredProducts = this.products;
                },
              err => console.error(<any>err)
          );
      }
}