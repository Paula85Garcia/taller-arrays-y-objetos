let clientes = [
    {
        nombreCliente: "Juan",
        identidadCliente: "12345",
        cuentaCliente: "963",
        pinCliente: "456",
        saldo: 500000 // saldo inicial
    },
    {
        nombreCliente: "Pilar",
        identidadCliente: "23697",
        cuentaCliente: "964",
        pinCliente: "414",
        saldo: 300000 // saldo inicial
    }
];

let colaDeTurnos = []; // Cola para gestionar los turnos
let contadorTurnos = 0; // Contador de turnos

// Función para tomar un turno
function tomarTurno() {
    let turno = ++contadorTurnos;
    colaDeTurnos.push(turno);
    alert(`Su turno es el número ${turno}`);
}

// Función para llamar al siguiente cliente
function llamarCliente() {
    if (colaDeTurnos.length === 0) {
        alert("No hay clientes en la cola de espera.");
        return;
    }
    let turnoLlamado = colaDeTurnos.shift(); // Extrae el primer turno
    alert("Llamando al cliente con el turno número ${turnoLlamado}");
}

// Función para mostrar la cola de espera
function mostrarCola() {
    if (colaDeTurnos.length === 0) {
        alert("La cola de espera está vacía.");
        return;
    }
    alert()// Array para almacenar las citas médicas
let citas = [];

// Función para programar una cita
function programarCita() {
    let nombrePaciente = prompt("Ingrese el nombre del paciente:");
    let fecha = prompt("Ingrese la fecha de la cita (en formato YYYY-MM-DD):");
    let hora = prompt("Ingrese la hora de la cita (en formato HH:MM):");
    let medico = prompt("Ingrese el nombre del médico:");

    // Crear objeto para la cita
    let cita = {
        nombrePaciente: nombrePaciente,
        fecha: fecha,
        hora: hora,
        medico: medico
    };

    // Agregar la cita al array
    citas.push(cita);
    alert("Cita programada exitosamente.");
}

// Función para ver las citas programadas
function verCitas() {
    if (citas.length === 0) {
        alert("No hay citas programadas.");
        return;
    }

    // Ordenar citas por fecha y hora
    citas.sort((a, b) => {
        if (a.fecha !== b.fecha) {
            return new Date(a.fecha) - new Date(b.fecha);
        } else {
            return a.hora.localeCompare(b.hora);
        }
    });

    // Mostrar citas
    let mensaje = "Citas programadas:\n";
    citas.forEach(`(cita, index) => {
        mensaje += ${index + 1}. ${cita.nombrePaciente} - ${cita.fecha} ${cita.hora} con Dr(a). ${cita.medico}\n;
    }`);
    alert(mensaje);
}

// Función para cancelar una cita
function cancelarCita() {
    verCitas();
    let indice = Number(prompt("Ingrese el número de la cita que desea cancelar:")) - 1;

    if (indice < 0 || indice >= citas.length) {
        alert("Número de cita no válido.");
        return;
    }

    // Eliminar la cita del array
    citas.splice(indice, 1);
    alert("Cita cancelada exitosamente.");
}

// Función principal para interactuar con el sistema
function gestionarCitas() {
    let continuar = true;

    while (continuar) {
        let opcion = Number(prompt`(Seleccione una opción:\n1. Programar cita\n2. Ver citas programadas\n3. Cancelar cita\n4. Salir)`);

        switch (opcion) {
            case 1:
                programarCita();
                break;
            case 2:
                verCitas();
                break;
            case 3:
                cancelarCita();
                break;
            case 4:
                continuar = false;
                alert("Gracias por usar el sistema de gestión de citas médicas. ¡Hasta luego!");
                break;
            default:
                alert("Opción no válida.");
                break;
        }
    }
}

// Ejecutar la aplicación
gestionarCitas();(`Cola de espera: ${colaDeTurnos.join(", ")}`);
}

// Función para gestionar transacciones del cliente
function realizarTransacciones(cliente) {
    let continuar = true;
    while (continuar) {
        let option = Number(prompt `(Bienvenido, seleccione: \n1. Consultar saldo \n2. Retirar \n3. Depositar \n4. Transferir \n5. Tomar turno \n6. Llamar siguiente cliente \n7. Mostrar cola de espera \n8. Salir)`);
        
        switch (option) {
            case 1:
                alert(`Su saldo es $${cliente.saldo}`);
                break;
            case 2:
                retirar(cliente);
                alert(`Su nuevo saldo es $${cliente.saldo}`);
                break;
            case 3:
                depositar(cliente);
                break;
            case 4:
                transferir(cliente);
                break;
            case 5:
                tomarTurno();
                break;
            case 6:
                llamarCliente();
                break;
            case 7:
                mostrarCola();
                break;
            case 8:
                continuar = false;
                alert("Gracias por usar el cajero automático. ¡Hasta luego!");
                break;
            default:
                alert("Opción no válida");
                break;
        }
    }
}

// Función para retirar dinero
function retirar(cliente) {
    let retiro = Number(prompt("Ingrese el valor a retirar (en múltiplos de 50000):"));
    if (retiro % 50000 !== 0) {
        alert("El retiro debe ser en múltiplos de 50000.");
        return;
    }
    if (retiro <= cliente.saldo) {
        cliente.saldo -= retiro;
        alert(`Retiro exitoso. Puede tomar $${retiro} de la bandeja principal. Su nuevo saldo es $${cliente.saldo}`);
    } else {
        alert("Saldo insuficiente");
    }
}

// Función para depositar dinero
function depositar(cliente) {
    let monto = Number(prompt("Ingrese el monto a depositar:"));
    let tipo = prompt("¿Es efectivo o cheque? (e/c):").toLowerCase();
    
    if (!isNaN(monto) && (tipo === 'e' || tipo === 'c')) {
        cliente.saldo += monto;
        alert(`Depósito exitoso. Su nuevo saldo es $${cliente.saldo}`);
    } else {
        alert("Monto o tipo de depósito no válido.");
    }
}

// Función para transferir dinero
function transferir(cliente) {
    let identidadDestino = prompt("Ingrese la identidad del destinatario:");
    let monto = Number(prompt("Ingrese el monto a transferir:"));
    
    let destinatario = clientes.find(x => x.identidadCliente === identidadDestino);
    
    if (!destinatario) {
        alert("Destinatario no encontrado.");
        return;
    }
    
    if (monto <= cliente.saldo) {
        cliente.saldo -= monto;
        destinatario.saldo += monto;
        alert(`Transferencia exitosa. Ha transferido $${monto} a ${destinatario.nombreCliente}. Su nuevo saldo es $${cliente.saldo}`);
    } else {
        alert("Saldo insuficiente para la transferencia.");
    }
}

// Verificación de usuario e inicio de transacciones
let check = false;
let verificacionUsuario = prompt("Ingrese su identidad:");

while (!check) {
    let busqueda = clientes.find(x => x.identidadCliente === verificacionUsuario);
    
    if (busqueda) {
        alert(`Bienvenido ${busqueda.nombreCliente}, digite su PIN`);
        let clave = prompt("Ingrese su PIN:");
        
        if (busqueda.pinCliente === clave) {
            alert("INGRESO EXITOSO");
            check = true;
            realizarTransacciones(busqueda);
        } else {
            alert("PIN incorrecto. Intente nuevamente.");
            verificacionUsuario = prompt("Ingrese su identidad nuevamente:");
        }
    } else {
        alert("Identidad no encontrada. Intente nuevamente.");
        verificacionUsuario = prompt("Ingrese su identidad nuevamente:");
    }
}