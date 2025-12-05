export async function obtenerFrase(locale = "es") {
  try {
    const endpoint = `https://goquotes-api.herokuapp.com/api/v1/random?lang=${locale}`;

    const res = await fetch(endpoint, {
      next: { revalidate: 3600 } // Cambia cada 1 hora
    });

    if (!res.ok) throw new Error("Error API frases");

    const data = await res.json();
    const quote = data.data.quotes[0];

    return {
      frase: quote.text,
      autor: quote.author
    };

  } catch (e) {
    console.error("Error obteniendo frase:", e);

    // Fallback elegante
    return locale === "es"
      ? {
          frase: "La inspiración existe, pero tiene que encontrarte trabajando.",
          autor: "Pablo Picasso",
        }
      : {
          frase: "Inspiration exists, but it has to find you working.",
          autor: "Pablo Picasso",
        };
  }
}
