// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
// ===== Amigo Secreto =====

// Lista de participantes y control de ronda
let amigos = [];
let pendientes = [];

// Convierte cada palabra a Mayúscula Inicial respetando guiones y apóstrofes
function aTitulo(texto) {
  return texto
    .split(/\s+/)
    .map(p =>
      p.split(/([-'])/)
       .map(seg => seg.length ? seg.charAt(0).toUpperCase() + seg.slice(1).toLowerCase() : seg)
       .join('')
    )
    .join(' ');
}

// Baraja un arreglo in-place (Fisher–Yates)
function mezclar(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// Prepara una nueva ronda con todos los índices barajados
function prepararRonda() {
  pendientes = amigos.map((_, i) => i);
  mezclar(pendientes);
}

// Agrega un nombre validado a la lista y reinicia la ronda
function agregarAmigo() {
  const input = document.getElementById('amigo');
  let nombre = (input.value || '').trim();

  if (nombre === '') {
    alert('Por favor, inserte un nombre.');
    input.value = '';
    input.focus();
    return;
  }

  nombre = nombre.replace(/\s+/g, ' ');

  // Solo letras (incluye acentos), espacios, apóstrofes o guiones
  const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+(?:[ '\-][A-Za-zÁÉÍÓÚáéíóúÑñÜü]+)*$/;
  if (!regexNombre.test(nombre)) {
    alert('Ingrese un nombre válido con solo letras, espacios, apóstrofes o guiones.');
    input.value = '';
    input.focus();
    return;
  }

  // Longitud razonable
  if (nombre.length < 2 || nombre.length > 40) {
    alert('Ingrese un nombre con entre 2 y 40 caracteres.');
    input.value = '';
    input.focus();
    return;
  }

  nombre = aTitulo(nombre);

  // Evita duplicados exactos
  if (amigos.includes(nombre)) {
    alert('Ese nombre ya está en la lista.');
    input.value = '';
    input.focus();
    return;
  }

  amigos.push(nombre);
  input.value = '';
  input.focus();

  prepararRonda();
  actualizarLista();

  // Limpia el resultado al agregar nuevos nombres
  const resultadoUL = document.getElementById('resultado');
  resultadoUL.innerHTML = '';
}

// Renderiza la lista de participantes en pantalla
function actualizarLista() {
  const lista = document.getElementById('listaAmigos');
  lista.innerHTML = '';
  for (let i = 0; i < amigos.length; i++) {
    const li = document.createElement('li');
    li.textContent = amigos[i];
    lista.appendChild(li);
  }
}

// Sorteo sin reemplazo; mínimo 2 nombres; al terminar ronda, reset total
function sortearAmigo() {
  const resultadoUL = document.getElementById('resultado');

  if (amigos.length === 0) {
    alert('Agregue al menos un nombre antes de sortear.');
    return;
  }

  if (amigos.length === 1) {
    alert('Se necesitan al menos dos nombres para realizar un sorteo.');
    return;
  }

  // Si no quedan pendientes, se terminó la ronda: reset total para comenzar de cero
  if (pendientes.length === 0) {
    alert('Ya salieron todos los nombres. La lista se reiniciará para un nuevo sorteo.');
    amigos = [];
    pendientes = [];
    actualizarLista();
    resultadoUL.innerHTML = '';
    const input = document.getElementById('amigo');
    if (input) input.focus();
    return;
  }

  // Toma el siguiente índice pendiente
  const indice = pendientes.pop();
  const elegido = amigos[indice];

  resultadoUL.innerHTML = `<li>🎉 El Amigo Secreto es: <strong>${elegido}</strong></li>`;
}

// Atajo: Enter en el input agrega el nombre
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('amigo');
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') agregarAmigo();
    });
  }
});

