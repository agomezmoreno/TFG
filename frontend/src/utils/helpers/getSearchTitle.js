// texto para el título de resultados: texto, categoría o ambos
function getSearchTitle(texto, categoria) {
  if (texto && categoria) {
    return `"${texto}" en categoria ${categoria}`;
  }
  if (texto) {
    return `"${texto}"`;
  }
  if (categoria) {
    return `categoría ${categoria}`;
  }
  return "búsqueda";
}

export default getSearchTitle;
