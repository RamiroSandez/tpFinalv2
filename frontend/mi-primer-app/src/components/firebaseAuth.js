const user = firebase.auth().currentUser; // Verifica si hay un usuario autenticado
if (user) {
  const token = await user.getIdToken(); // Obtiene el token del usuario autenticado
  // Envia el token al backend en el encabezado Authorization
  const response = await fetch("http://localhost:3000/api/clientes", {
    method: "GET", // O el método que sea apropiado
    headers: {
      Authorization: `Bearer ${token}`, // El token se envía aquí
    },
  });

  if (response.ok) {
    const data = await response.json(); // Procesa la respuesta
    console.log("Datos de clientes:", data);
  } else {
    console.log("Error al obtener los datos");
  }
} else {
  console.log("Usuario no autenticado");
}