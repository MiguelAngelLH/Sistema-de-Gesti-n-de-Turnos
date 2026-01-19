const ESTADOS = {
  PENDIENTE: "pendiente",
  ATENDIDO: "atendido",
  CANCELADO: "cancelado"
};

let turnos = [];
let contadorId = 1;

function formatFechaHora(ts) {
  const d = new Date(ts);
  const pad = n => String(n).padStart(2, "0");
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())} ${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}

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

function atenderTurnoEspecifico(id) {
  const turno = turnos.find(t => t.id === id);
  if (turno && turno.estado === ESTADOS.PENDIENTE) {
    turno.estado = ESTADOS.ATENDIDO;
    renderizarTurnos();
  }
}

function renderizarTurnos() {
  const listaPendientes = document.getElementById("listaPendientes");
  const listaAtendidos = document.getElementById("listaAtendidos");
  const listaCancelados = document.getElementById("listaCancelados");

  listaPendientes.innerHTML = "";
  listaAtendidos.innerHTML = "";
  listaCancelados.innerHTML = "";

  // Separar turnos por estado y mostrarlos en su lista correspondiente
  turnos.forEach(turno => {
    const li = document.createElement("li");
    li.className = `${turno.tipo} ${turno.estado}`;

    const horaRegistro = formatFechaHora(turno.fecha);

    const infoHtml = `
      <div class="info">
        <div class="title"><span>Turno #${turno.id}</span><em>${turno.tipo}</em></div>
        <div class="meta"><span class="hora">Hora registro: ${horaRegistro}</span><span class="estado">${turno.estado}</span></div>
      </div>
    `;

    if (turno.estado === ESTADOS.PENDIENTE) {
      li.innerHTML = infoHtml + `<div class="acciones"><button class="atender" onclick="atenderTurnoEspecifico(${turno.id})">Atender</button><button class="cancelar" onclick="cancelarTurno(${turno.id})">Cancelar</button></div>`;
      listaPendientes.appendChild(li);
    } else if (turno.estado === ESTADOS.ATENDIDO) {
      li.innerHTML = infoHtml;
      listaAtendidos.appendChild(li);
    } else if (turno.estado === ESTADOS.CANCELADO) {
      li.innerHTML = infoHtml;
      listaCancelados.appendChild(li);
    }
  });
}
