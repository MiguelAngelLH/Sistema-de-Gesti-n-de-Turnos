const ESTADOS = {
  PENDIENTE: "pendiente",
  ATENDIDO: "atendido",
  CANCELADO: "cancelado"
};

let turnos = [];
let contadorId = 1;

function registrarTurno() {
  const tipo = document.getElementById("tipoTurno").value;

  turnos.push({
    id: contadorId++,
    tipo,
    estado: ESTADOS.PENDIENTE,
    fecha: Date.now()
  });

  renderizarTurnos();
}

function atenderTurno() {
  const prioritarios = turnos.filter(t =>
    t.tipo === "prioritario" && t.estado === ESTADOS.PENDIENTE
  );

  const normales = turnos.filter(t =>
    t.tipo === "normal" && t.estado === ESTADOS.PENDIENTE
  );

  const turno = prioritarios[0] || normales[0];

  if (!turno) {
    alert("No hay turnos pendientes");
    return;
  }

  turno.estado = ESTADOS.ATENDIDO;
  renderizarTurnos();
}

function cancelarTurno(id) {
  const turno = turnos.find(t => t.id === id);
  if (turno && turno.estado === ESTADOS.PENDIENTE) {
    turno.estado = ESTADOS.CANCELADO;
    renderizarTurnos();
  }
}

function renderizarTurnos() {
  const lista = document.getElementById("listaTurnos");
  lista.innerHTML = "";

  turnos
    .filter(t => t.estado === ESTADOS.PENDIENTE)
    .forEach(turno => {
      const li = document.createElement("li");
      li.className = turno.tipo;

      li.innerHTML = `
        <span>Turno #${turno.id}</span>
        <button onclick="cancelarTurno(${turno.id})">✕</button>
      `;

      lista.appendChild(li);
    });
}
