// user-table.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements OnInit {
  title = 'Tabla de Usuarios';
  users: any[] = [];
  apiUrl: string = 'http://127.0.0.1:8000/api/users';

  constructor(private http: HttpClient) {}
  getUsers() {
    this.http.get('http://127.0.0.1:8000/api/users').subscribe((data) => {
      console.log(data);
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  viewDetails(user: any): void {
    alert(`Detalles del usuario:\n\nNombre: ${user.name}\nCorreo: ${user.email}\nContraseña: ${user.password}\nAvatar: ${user.avatar}\nCreado: ${user.created_at}\nActualizado: ${user.updated_at}`);
  }

  editUser(user: any): void {
    const updatedName = prompt('Editar Nombre:', user.name);
    const updatedEmail = prompt('Editar Correo:', user.email);
    const updatedPassword = prompt('Editar Contraseña:', user.password);
    const updatedAvatar = prompt('Editar Avatar URL:', user.avatar);

    if (updatedName && updatedEmail && updatedPassword && updatedAvatar) {
      const updatedUser = {
        ...user,
        name: updatedName,
        email: updatedEmail,
        password: updatedPassword,
        avatar: updatedAvatar,
      };
      this.http.put(`${this.apiUrl}/${user.id}`, updatedUser).subscribe(
        () => {
          this.loadUsers();
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    }
  }

  deleteUser(userId: number): void {
    if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
      this.http.delete(`${this.apiUrl}/${userId}`).subscribe(
        () => {
          this.loadUsers();
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }

  addUser(): void {
    const name = prompt('Nombre del Usuario:');
    const email = prompt('Correo Electrónico:');
    const password = prompt('Contraseña:');
    const avatar = prompt('Avatar URL:');

    if (name && email && password && avatar) {
      const newUser = { name, email, password, avatar };
      this.http.post(this.apiUrl, newUser).subscribe(
        () => {
          this.loadUsers();
        },
        (error) => {
          console.error('Error adding user:', error);
        }
      );
    }
  }
}

