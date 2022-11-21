export async function getCategories() {
  const result = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const response = await result.json();
  return response;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const response = await result.json();
  return response;
}

export async function getProductById(id) {
  const result = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const response = await result.json();
  return response;
}

export async function getAddressByCep(cep) {
  const result = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const response = result.json();
  return response;
}
