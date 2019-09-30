import {Component, OnInit} from '@angular/core';
import {Product} from '../products/Product';
import {Category} from '../categories/Category';
import {RestService} from '../service/rest.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css']
})
export class AdminAddProductComponent implements OnInit {
  model = new Product();
  categories: Category[];
 /* uploadForm: FormGroup;
  selectedFile: File;
  fileData: File = null;
  filestring: string;*/
  constructor(private restService: RestService,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.getCategories();
  }
/*  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
      this.selectedFile = file;
    }
  }*/
  getCategories(): void {
    this.restService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  saveProduct() {
    this.restService.sendProduct(this.model).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    this.model = new Product();
    alert('Adding Product is completed');
  }

}
