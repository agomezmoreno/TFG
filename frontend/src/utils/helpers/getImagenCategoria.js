import frutaImg from "../../assets/fruta.png";
import verduraImg from "../../assets/verdura.png";
import carneImg from "../../assets/carne.png";
import pescadoImg from "../../assets/pescado.png";

// devuelve imagen según categoría Fruta, Verdura, Carne, Pescado
function getImagenCategoria(nombre) {
  if (nombre === "Fruta") return frutaImg;
  if (nombre === "Verdura") return verduraImg;
  if (nombre === "Carne") return carneImg;
  if (nombre === "Pescado") return pescadoImg;
  return pescadoImg;
}

export default getImagenCategoria;
