# Documentación de Componentes CRUD y Login

## Introducción
Este proyecto utiliza Angular para gestionar funcionalidades como el inicio de sesión y las operaciones CRUD (Crear, Leer, Actualizar y Eliminar) en tablas de productos y usuarios. A continuación, se presenta una descripción interactiva y práctica de cada componente.

---

## 1. Componente de Login
### Qué hace este componente
Permite a los usuarios autenticarse ingresando su correo electrónico y contraseña. Si la autenticación es exitosa, el usuario es redirigido al dashboard.

### Características clave
- **Formulario reactivo**: Validaciones integradas (requerido y formato de correo).
- **Interacción con el API**: Solicitud `POST` para validar credenciales.
- **Redirección**: Navegación automática tras el inicio de sesión exitoso.

### Ejemplo Dinámico
```typescript
onSubmit() {
  if (this.loginForm.valid) {
    this.http.post('http://127.0.0.1:8000/api/login', this.loginForm.value)
      .subscribe({
        next: (response) => {
          console.log('Login exitoso:', response);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error al iniciar sesión:', error);
        }
      });
  }
}
```
### Prueba en Acción
1. Ingresa un correo válido (e.g., `usuario@ejemplo.com`).
2. Agrega una contraseña cualquiera.
3. Observa cómo el sistema autentica y redirige.

---

## 2. Tabla de Productos
### Qué hace este componente
Permite visualizar, agregar, editar y eliminar productos. Es ideal para gestionar catálogos o inventarios.

### Características clave
- **Carga automática**: Recupera productos del API al cargar el componente.
- **CRUD completo**: Operaciones para agregar, actualizar y eliminar productos.

### Ejemplo Dinámico
**Cargar Productos**
```typescript
loadProducts() {
  this.http.get<any[]>(this.apiUrl)
    .subscribe(data => {
      this.products = data;
      console.log('Productos cargados:', this.products);
    });
}
```
**Agregar Producto**
```typescript
addProduct(product: any) {
  this.http.post(this.apiUrl, product)
    .subscribe(response => {
      console.log('Producto agregado:', response);
      this.loadProducts();
    });
}
```
**Editar Producto**
```typescript
updateProduct(product: any) {
  const url = `${this.apiUrl}/${product.id}`;
  this.http.put(url, product)
    .subscribe(response => {
      console.log('Producto actualizado:', response);
      this.loadProducts();
    });
}
```
**Eliminar Producto**
```typescript
deleteProduct(productId: number) {
  const url = `${this.apiUrl}/${productId}`;
  this.http.delete(url)
    .subscribe(response => {
      console.log('Producto eliminado:', response);
      this.loadProducts();
    });
}
```

### Interactividad
1. **Carga**: Abre la tabla y verifica los productos cargados.
2. **Agregar**: Introduce un nuevo producto y observa la actualización.
3. **Editar**: Modifica un producto existente y confirma los cambios.
4. **Eliminar**: Borra un producto y verifica el impacto inmediato.

---

## 3. Tabla de Usuarios
### Qué hace este componente
Gestiona la información de los usuarios del sistema, incluyendo sus detalles personales.

### Características clave
- **Listado completo**: Muestra a todos los usuarios.
- **CRUD completo**: Permite agregar, editar y eliminar usuarios.

### Ejemplo Dinámico
**Cargar Usuarios**
```typescript
loadUsers() {
  this.http.get<any[]>(this.apiUrl)
    .subscribe(data => {
      this.users = data;
      console.log('Usuarios cargados:', this.users);
    });
}
```
**Eliminar Usuario**
```typescript
deleteUser(userId: number) {
  const url = `${this.apiUrl}/${userId}`;
  this.http.delete(url)
    .subscribe(response => {
      console.log('Usuario eliminado:', response);
      this.loadUsers();
    });
}
```

### Interactividad
1. **Cargar**: Abre la tabla para visualizar los usuarios actuales.
2. **Agregar**: Crea un nuevo usuario y confírmalo en la lista.
3. **Editar**: Cambia información de un usuario y guarda los cambios.
4. **Eliminar**: Prueba eliminando un usuario y observa la lista actualizada.

---

## 4. Cerrar Sesión
### Qué hace este componente
Permite a los usuarios cerrar su sesión actual de manera segura y limpia. Adicionalmente, muestra la foto de perfil del usuario autenticado.

### Características clave
- **Foto de perfil**: Se muestra una imagen del usuario.
- **Cierre de sesión**: Borra las credenciales y redirige al login.

### Ejemplo Dinámico
**Mostrar Foto y Cerrar Sesión**
```typescript
logout() {
  this.http.post('http://127.0.0.1:8000/api/logout', {}).subscribe({
    next: () => {
      console.log('Sesión cerrada');
      this.router.navigate(['/login']);
    },
    error: (error) => {
      console.error('Error al cerrar sesión:', error);
    }
  });
}
```

**HTML**
```html
<div class="profile">
  <img [src]="user.profilePicture" alt="Foto de perfil">
  <button (click)="logout()">Cerrar Sesión</button>
</div>
```

### Interactividad
1. Asegúrate de que el usuario haya iniciado sesión.
2. Verifica que la foto de perfil aparece correctamente.
3. Haz clic en "Cerrar Sesión" y observa la redirección al login.

---

## Conclusión
Este sistema es altamente funcional y flexible, permitiendo gestionar tanto la autenticación como los datos de usuarios y productos. Algunos puntos clave incluyen:

1. **Integración de API**: Gracias a `HttpClient`, la comunicación con el servidor es directa y eficiente.
2. **Modularidad**: Los componentes están diseñados para ser reutilizables y escalables.
3. **Interactividad**: La estructura del proyecto facilita probar y ajustar cada función de manera sencilla.

Este sistema es una excelente base para construir aplicaciones web modernas. Su enfoque modular permite agregar nuevas características, como notificaciones en tiempo real, análisis de datos o exportación de reportes. Además, la implementación actual es adaptable para trabajar con diferentes APIs o servicios en la nube, haciéndolo ideal para proyectos empresariales o académicos.

