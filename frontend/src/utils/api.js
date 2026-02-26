// get, devuelve json o null
export function apiGet(url) {
  return fetch(url)
    .then((req) => {
      if (!req.ok) {
        console.log("Error en la peticion " + req.status);
        return null;
      } else {
        return req.json();
      }
    })
    .catch((e) => {
      console.log("No se ha podido hacer la peticion", e);
      return null;
    });
}

// post con body json, devuelve json o null
export function apiPost(url, body) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((req) => {
      if (!req.ok) {
        console.log("Error en la peticion " + req.status);
        return null;
      } else {
        return req.json();
      }
    })
    .catch((e) => {
      console.log("No se ha podido hacer la peticion", e);
      return null;
    });
}

// delete, devuelve json o null
export function apiDelete(url) {
  return fetch(url, {
    method: "DELETE",
  })
    .then((req) => {
      if (!req.ok) {
        console.log("Error en la petición " + req.status);
        return null;
      } else {
        return req.json();
      }
    })
    .catch((e) => {
      console.log("No se ha podido hacer la petición", e);
      return null;
    });
}

// patch con body json, devuelve json o null
export function apiPatch(url, body) {
  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((req) => {
      if (!req.ok) {
        console.log("Error en la petición PATCH " + req.status);
        return null;
      } else {
        return req.json();
      }
    })
    .catch((e) => {
      console.log("No se ha podido hacer la petición PATCH", e);
      return null;
    });
}
