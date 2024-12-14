import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, MatIconModule],
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.css'],
})
export class TablasComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  selectedProduct: any = null;
  editableProduct: any = {};
  productToDelete: any = null;
  newProduct: any = { title: '', description: '', image: '' };
  searchTerm: string = '';
  apiUrl = 'http://127.0.0.1:8000/api/shoes';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(): void {
    this.http.get<any>(this.apiUrl).subscribe(
      (response) => {
        // Accede correctamente a la lista de productos dentro de la clave "products"
        this.products = response.products.map((product: any) => ({
          id: product.id,
          title: product.title,
          description: product.description,
          image: product.image || product.thumbnail, // Prioriza "image", pero usa "thumbnail" si no está
        }));
        this.filteredProducts = [...this.products]; // Copia los productos para las búsquedas
        console.log('Productos obtenidos:', this.products); // Verifica en consola
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
        alert('Hubo un error al cargar los productos. Por favor, intenta de nuevo más tarde.');
      }
    );
  }
  

  searchProducts(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter((product) =>
      product.title.toLowerCase().includes(term)
    );
    this.currentPage = 1;
  }

  get paginatedProducts(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(start, start + this.itemsPerPage);
  }
  

  prevPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.filteredProducts.length) {
      this.currentPage++;
    }
  }

  openModal(product: any): void {
    this.selectedProduct = product;
  }

  openEditModal(product: any): void {
    this.editableProduct = { ...product }; // Copia el producto seleccionado
  }
  
  saveChanges(): void {
    const url = `${this.apiUrl}/${this.editableProduct.id}`;
    this.http.put(url, this.editableProduct).subscribe(
      () => {
        const index = this.products.findIndex(p => p.id === this.editableProduct.id);
        if (index !== -1) {
          this.products[index] = { ...this.editableProduct }; // Actualiza la lista
          this.filteredProducts = [...this.products];
        }
        alert('Producto actualizado correctamente');
        this.editableProduct = {}; // Limpia el producto editable
      },
      (error) => {
        console.error('Error al actualizar el producto:', error);
        alert('Error al actualizar el producto.');
      }
    );
  }
  
  
  

  openDeleteModal(product: any): void {
    this.productToDelete = product;
  }
  
  deleteProduct(): void {
    const url = `${this.apiUrl}/${this.productToDelete.id}`;
    this.http.delete(url).subscribe(
      () => {
        this.products = this.products.filter(p => p.id !== this.productToDelete.id);
        this.filteredProducts = [...this.products]; // Actualiza la lista
        alert('Producto eliminado correctamente');
        this.productToDelete = null;
      },
      (error) => {
        console.error('Error al eliminar el producto:', error);
        alert('Error al eliminar el producto.');
      }
    );
  }
  
  

  addProduct(): void {
    const url = this.apiUrl; // Asegúrate de que la URL esté correcta
    this.http.post(url, this.newProduct).subscribe(
      (response: any) => {
        // Si el producto se agrega correctamente, actualizamos la lista
        this.products.push(response);
        this.filteredProducts = [...this.products];
        alert('Producto agregado correctamente');
        this.newProduct = { title: '', description: '', image: '' }; // Limpia el formulario
      },
      (error) => {
        console.error('Error al agregar el producto:', error);
        alert('Error al agregar el producto.');
      }
    );
  }
  
  


  

}
