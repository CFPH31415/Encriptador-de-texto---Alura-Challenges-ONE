const DICCIONARIO = Object.freeze({ e: 'enter', i: 'imes', o: 'ober', a: 'ai', u: 'ufat' });
const seccionVacio = document.getElementById('warningSection');
const seccionResultado = document.getElementById('resultsSection');
const texto = document.getElementById('texto');
const resultado = document.getElementById('resultado');

const cifrarDecifrar = (text, type) => {
  return Object.keys(DICCIONARIO).reduce((acc, key) => {
    const valor = DICCIONARIO[key];
    if (type === 'cifrar') {
      return acc.replaceAll(key, valor);
    } else if (type === 'decifrar') {
      return acc.replaceAll(valor, key);
    }
    return acc;
  }, text);
};

const mostrarResultado = (text) => {
  resultado.value = text;
  seccionVacio.classList.toggle('novisible', !!text);
  seccionResultado.classList.toggle('novisible', !text);
};

const copiarResultado = () => {
  navigator.clipboard.writeText(resultado.value)
    .then(() => {
      const copyButton = document.getElementById('copyButton');
      const primario = copyButton.querySelector('.primario');
      const alternativo = copyButton.querySelector('.alternativo');
      primario.style.display = 'none';
      alternativo.style.display = 'inline';

      setTimeout(() => {
        primario.style.display = 'inline';
        alternativo.style.display = 'none';
      }, 1500);
    })
    .catch(err => {
      console.error('Error copying text: ', err);
    });
};

const limpiarTexto = (e) => {
  texto.value = e.target.value.replace(/[^a-z\s]+/g, '');
};

const start = (type) => {
  const textoLimpio = texto.value.trim();
  if (textoLimpio) {
    mostrarResultado(cifrarDecifrar(textoLimpio, type));
  } else {
    mostrarResultado('');
  }
};
