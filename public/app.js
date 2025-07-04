const apiUrl = '/api/productos';
let editandoId = null;

document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();

  document.getElementById('producto-form').addEventListener('submit', e => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const precio = document.getElementById('precio').value;

    const producto = { nombre, descripcion, precio };

    if (editandoId) {
      fetch(`${apiUrl}/${editandoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
      }).then(() => {
        mostrarAlerta('Producto actualizado correctamente', 'success');
        resetFormulario();
        cargarProductos();
      }).catch(() => {
        mostrarAlerta('Error al actualizar producto ', 'danger');
      });
    } else {
      fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
      }).then(() => {
        mostrarAlerta('Producto creado correctamente ✔', 'success');
        resetFormulario();
        cargarProductos();
      }).catch(() => {
        mostrarAlerta('Error al crear producto ', 'danger');
      });
    }
  });
});

function cargarProductos() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(productos => {
      const tbody = document.getElementById('productos-body');
      tbody.innerHTML = '';
      productos.forEach(p => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${p.nombre}</td>
          <td>${p.descripcion}</td>
          <td>$${parseFloat(p.precio).toFixed(2)}</td>
          <td>
            <button class="btn btn-sm btn-warning me-2" onclick="editar(${p.id}, '${p.nombre}', '${p.descripcion}', ${p.precio})">Editar</button>
            <button class="btn btn-sm btn-danger" onclick="eliminar(${p.id})">Eliminar</button>
          </td>
        `;
        tbody.appendChild(fila);
      });
    });
}

function editar(id, nombre, descripcion, precio) {
  document.getElementById('nombre').value = nombre;
  document.getElementById('descripcion').value = descripcion;
  document.getElementById('precio').value = precio;
  editandoId = id;
}

function eliminar(id) {
  fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
    .then(() => {
      mostrarAlerta('Producto eliminado 🗑️', 'warning');
      cargarProductos();
    }).catch(() => {
      mostrarAlerta('Error al eliminar producto', 'danger');
    });
}

function resetFormulario() {
  document.getElementById('producto-form').reset();
  editandoId = null;
}

function mostrarAlerta(mensaje, tipo = 'success') {
  const alerta = document.getElementById('alerta');
  alerta.className = `alert alert-${tipo}`;
  alerta.textContent = mensaje;
  alerta.classList.remove('d-none');

  setTimeout(() => {
    alerta.classList.add('d-none');
  }, 3000);
}
