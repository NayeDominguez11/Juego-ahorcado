; (function () {
  'use strict'
  var botonLimpiar = document.querySelector("#bton-desis");
  botonLimpiar.onclick = Desistir;

  var palabras = [
    'ALURA',
    'STYLE',
    'INDEX',
    'JUEGO',
    'GOOGLE',
    'BUSCAR',
    'DIV',
    'SPAN',
    'FORM',
    'LENGTH',
    'ARRAY',
    'INPUT',
    'TYPE',
    'VALUE',
    'FOOTER',
    'MAIN',
    'CLASS',
    'ID',
    'SCRIPT',
    'BUTTON',
    'PROGRAMAR',
    'ORACLE',
    'YOUTUBE'
  ];

  //variable para almacenar la configuracion actual
  var juego = null;

  //para ver si ya se ha enviado alguna alerta
  var finalizado = false;

  var $html = {
    hombre: document.getElementById('hombre'),
    adivinador: document.querySelector('.adivinador-palabras'),
    errado: document.querySelector('.errado-en-palabras')
  };

  function dibujar(juego) {
    //actualizar la imagen del hombre
    var $elem;
    $elem = $html.hombre;
    //var $limpiar;
    var estado = juego.estado;
    if (estado === 8) {
      estado = juego.previo;
    };

    $elem.src = 'imagenes/estados/' + estado + '.png';

    //creamos las letras adivinidas, obtenermos palabras y recorremos letras * letras
    var palabra = juego.palabra;
    var adivinado = juego.adivinado;
    var $elem = $html.adivinador;
    //borramos los elementos anteriores
    $elem.innerHTML = '';
    //para cada letra de la palabra esta dentos de las listas de letras divinadas
    for (let letra of palabra) {
      let $span = document.createElement('span');
      let $txt = document.createTextNode('');
      //si adivinado contiene la letra  la muestra        
      if (adivinado.indexOf(letra) >= 0) {
        $txt.nodeValue = letra;
      }
      //agregamos el texto al span
      $span.setAttribute('class', 'letras adivinada');
      $span.appendChild($txt);
      $elem.appendChild($span);
    };
    //creamos las letras erradas
    var errado = juego.errado;
    $elem = $html.errado;
    //borramos los elementos anteriores
    $elem.innerHTML = ''
    for (let letra of errado) {
      let $span = document.createElement('span');
      let $txt = document.createTextNode(letra);
      $span.setAttribute('class', 'letras erradas');
      $span.appendChild($txt);
      $elem.appendChild($span);
    };
  };

  function adivinarJuego(juego, letra) {
    var estado = juego.estado;
    //si ya se ha perdido, o ganado, no hay nada que hacer
    if (estado == 1 || estado == 8) {
      return;
    }
    //si ya hemos adivinado o errado la letra, no hay nada que hacer
    var adivinado = juego.adivinado;
    var errado = juego.errado;
    if (adivinado.indexOf(letra) >= 0 || errado.indexOf(letra) >= 0) {
      return;
    }
    var palabra = juego.palabra;
    //si es letra de la palabra 
    if (palabra.indexOf(letra) >= 0) {
      let ganado = true;
      //debemos ver si llegamos al estado ganado
      for (let letraCadena of palabra) {
        if (adivinado.indexOf(letraCadena) < 0 && letraCadena != letra) {
          ganado = false;
          juego.previo = juego.estado;
          break;
        }
      }
      //si ya se ha ganado, debemos indicarlo cambiado al estado
      if (ganado) {
        juego.estado = 8;
      }
      //agregamos la letra, a la lista de letras adivinadas
      adivinado.push(letra);
    } else {
      //si no es letra de la palabra, debemos actualizar el estado, acercamos al hombre un paso mas de su ahorca
      juego.estado--
      //agregamos la letra, a la lista de letras erradas
      errado.push(letra);
    }
  };
  //evento de ventana
  window.onkeypress = function adivinarLetras(e) {
    var letra = e.key
    //cambiamos a letras mayusculas
    letra = letra.toUpperCase()
    //verificamos que no tengamos caracter erroreneo
    if (/[^A-ZÑ]/.test(letra)) {
      return
    }
    adivinarJuego(juego, letra);
    var estado = juego.estado
    if (estado == 8 && !finalizado) {
      //muestra el mensaje de alerta despues de un cierto tiempo
      setTimeout(mensajeGanador, 500);
      finalizado = true;
    } else if (estado == 1 && !finalizado) {
      let palabra = juego.palabra;
      let fn = mensajePerdedor.bind(undefined, palabra);
      //muestra el mensaje de alerta despues de un cierto tiempo
      setTimeout(fn, 500);
      finalizado = true;
    }
    dibujar(juego);
  };

  window.nuevoJuego = function nuevoJuego() {
    var palabra = palabraAleatoria();
    juego = {};
    juego.palabra = palabra;
    juego.estado = 7;
    juego.adivinado = [];
    juego.errado = [];
    finalizado = false;
    dibujar(juego);
  };
  //elije la palabra aleatoria que colocamos
  function palabraAleatoria() {
    var index = ~~(Math.random() * palabras.length);
    return palabras[index];
  };

  //muestra el mensaje de alerta
  function mensajeGanador() {
    alert('Felicidades, ganaste!');
  };

  function mensajePerdedor(palabra) {
    alert('Lo siento, perdiste.' + '\n\nLa palabra era ' + palabra + '!!');
  };

  function Desistir() {
    let refresh =  document.querySelector("#bton-desis");
   refresh.addEventListener('click', _ => {
      location.reload();
   });
  };
  nuevoJuego();
}());

//indexOf = contiene