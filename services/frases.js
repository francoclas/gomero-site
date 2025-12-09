export async function obtenerFrase(locale = "es") {
 
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

