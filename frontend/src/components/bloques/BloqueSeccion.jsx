function BloqueSeccion({ titulo, contenido }) {
  return (
    <section>
      <h2 className="text-center text-xl font-semibold mb-6">{titulo}</h2>
      <div>{contenido}</div>
    </section>
  );
}

export default BloqueSeccion;
