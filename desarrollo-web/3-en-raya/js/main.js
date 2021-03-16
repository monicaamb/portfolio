// 0 - Vacia
// 1 - Jugador 1
// 2 - Jugador 2
// 3 - Desactivada

const casillasInicio = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
const miWebSocket = new WebSocket('ws://64fc79a3176d.ngrok.io');

new Vue({
    el: '#app',
    data: {
        casillas: casillasInicio,
        jugador: "1"
    },
    mounted: function () {
        this.iniciarEventosWebSocket();
    },
    methods: {
        marcar: function (x, y) {
            // Modificamos el valor
            this.casillas[x][y] = parseInt(this.jugador);
            // Forzamos el refresco
            this.$forceUpdate();
            // Enviamos lo pulsado al otro jugador
            miWebSocket.send(JSON.stringify({
                x: x,
                y: y,
                jugador: this.jugador
            }));
        },
        iniciarEventosWebSocket: function () {
            // Funciones
            function open () {
                // Abre conexión
                console.log("WebSocket abierto.");
            }

            const message = (evento) => {
                // Se recibe un mensaje
                console.log("WebSocket ha recibido un mensaje");
                // Mostrar mensaje en HTML
                const datosRecibidos = JSON.parse(evento.data);
                this.casillas[datosRecibidos.x][datosRecibidos.y] = datosRecibidos.jugador;
                this.$forceUpdate();
            };

            function error (evento) {
                // Ha ocurrido un error
                console.error("WebSocket ha observado un error: ", evento);
            }

            function close () {
                // Cierra la conexión
                console.log("WebSocket cerrado.");
            }

            // Eventos de WebSocket
            miWebSocket.addEventListener('open', open);
            miWebSocket.addEventListener('message', message);
            miWebSocket.addEventListener('error', error);
            miWebSocket.addEventListener('close', close);
        }
    }
});

