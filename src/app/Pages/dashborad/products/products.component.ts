import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { productsInfo } from 'src/app/productsDetails';
import { AuthoraztionService } from 'src/app/Services/authoraztion.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private authoriseService: AuthoraztionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  productDetials: any;
  getProductsList: any = [];
  pID: any;
  editMode = false;
  urls: any = []

  ngOnInit(): void {
    var va: any = localStorage.getItem('productsList');
    this.getProductsList = JSON.parse(va);

    this.activatedRoute.paramMap.subscribe((params) => {
      let pID = +params.get('id');
      if (pID >= 0) {
        this.productDetials = this.getProductsList.filter(
          (a) => a.productsID == pID
        );
        this.editMode = true;
      }
    });

    if (this.productDetials && this.productDetials.length) {
      this.urls = this.productDetials[0]?.productsImage
      this.addProductsForm.patchValue({
        productCategory: this.productDetials[0]?.productscategory,
        productName: this.productDetials[0]?.productsName,
        productPrice: this.productDetials[0]?.productsPrice,
        productQuantity: this.productDetials[0]?.productsQuantity,
        productImage: this.productDetials[0]?.productsImage,
        productDescription: this.productDetials[0]?.productsDescription,
      });
    }
  }

  addProductsForm = new FormGroup({
    productsID: new FormControl('0'),
    productCategory: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    productName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    productPrice: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    productQuantity: new FormControl('', [
      Validators.required,
      Validators.max(100),
    ]),
    productImage: new FormControl('', [
      Validators.required,
    ]),
    productDescription: new FormControl('', [
      Validators.required,
      Validators.minLength(15),
    ]),
  });

  get pCategory() {
    return this.addProductsForm.get('productCategory');
  }
  get pName() {
    return this.addProductsForm.get('productName');
  }
  get pPrice() {
    return this.addProductsForm.get('productPrice');
  }
  get pQuantity() {
    return this.addProductsForm.get('productQuantity');
  }
  get pImage() {
    return this.addProductsForm.get('productImage');
  }
  get pDescription() {
    return this.addProductsForm.get('productsDescription');
  }

  // for register products
  products: any = {};
  productsList: any = [];

  addMode = false;

  registerProducts() {
    console.log(this.urls);
    this.productsList = {
      productsID: 0,
      productscategory: this.addProductsForm.value.productCategory,
      productsName: this.addProductsForm.value.productName,
      productsPrice: this.addProductsForm.value.productPrice,
      productsQuantity: this.addProductsForm.value.productQuantity,
      productsImage: this.urls,
      productsDescription: this.addProductsForm.value.productDescription,
    };

    // this.productsList.productsID = this.productsList.length + 1;
    this.products = Object.assign(this.products, this.productsList);
    this.authoriseService.addProducts(this.products);
    this.cancel();
  }

  preview(event: any) {
    // console.log('event.target.files: ', event.target.files);
    if (event.target.files) {
      for (let i = 0; i < File.length; i++) {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (e: any) => {
          let image = {
            url: e.target.result,
            name: event.target.files[i].name
          }
          this.urls.push(image)
          console.log('this.urls: ', this.urls);
        }
      }
    }
  }

  update() {
    const updateProduct: any = {
      productsID: this.productDetials[0].productsID,
      productscategory: this.addProductsForm.value.productCategory,
      productsName: this.addProductsForm.value.productName,
      productsPrice: this.addProductsForm.value.productPrice,
      productsQuantity: this.addProductsForm.value.productQuantity,
      productsImage: this.addProductsForm.value.productImage,
      productsDescription: this.addProductsForm.value.productDescription,
    };

    const editProduct: any = this.getProductsList.filter(
      (r) => r.productsID != this.productDetials[0].productsID
    );
    // console.log('pID: ', this.productDetials[0].productsID);
    // console.log(' before editProduct: ', editProduct);
    editProduct.push(updateProduct);
    // console.log(' after editProduct: ', editProduct);

    localStorage.setItem('productsList', JSON.stringify(editProduct));
    this.cancel();
  }

  // back to dashborad
  cancel() {
    this.addProductsForm.reset();
    this.router.navigate(['/dashborad']);
  }
}
