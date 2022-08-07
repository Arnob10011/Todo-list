export async function fetchAPI(url, type, jsonOBj) {
  return await fetch(url, {
    method: type,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    //make sure to serialize your JSON body
    body: JSON.stringify(jsonOBj),
  });
}
