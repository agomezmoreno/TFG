import { auth, googleProvider, githubProvider } from "./firebase";
import { mostrarMensaje } from "../mensajes/mensajeModal";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut
} from "firebase/auth";

export function loginConEmail(email, password, navigate) {
  return () =>
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate("/"))
      .catch((err) => console.error("Error con email:", err));
}

export function loginConGoogle(navigate) {
  return () =>
    signInWithPopup(auth, googleProvider)
      .then(() => navigate("/"))
      .catch((err) => console.error("Error con Google:", err));
}

export function loginConGitHub(navigate) {
  return () =>
    signInWithPopup(auth, githubProvider)
      .then(() => navigate("/"))
      .catch((error) => {
        // ese correo ya está con Google o algo así
        if (error.code === "auth/account-exists-with-different-credential") {
          mostrarMensaje("Ese correo ya usa otro método (ej: Google). Usa ese método.", "error");
        } else {
          console.error("Error con GitHub:", error);
        }
      });
}

export function registerConEmail(nombre, apellidos, email, password, navigate) {
  return () => {
    if (!nombre.trim() || !apellidos.trim()) {
      mostrarMensaje("Pon nombre y apellidos", "error");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        const usuario = cred.user;
        const displayName = nombre.trim() + " " + apellidos.trim();
        return updateProfile(usuario, { displayName });
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error registrando con email:", error);
      });
  };
}

export function registerConGoogle(navigate) {
  return () =>
    signInWithPopup(auth, googleProvider)
      .then(() => navigate("/"))
      .catch((error) => {
        console.error("Error registrando con Google:", error);
      });
}

export function logout(navigate) {
  return () => {
    signOut(auth)
      .then(function () {
        navigate("/");
      })
      .catch(function (err) {
        console.log("Error al cerrar sesión:", err);
      });
  };
}
