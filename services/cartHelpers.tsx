export const getCartItems = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const saveCartItem = (item: any) => {
  const cart = getCartItems();
  const existingItem = cart.find((cartItem: any) => cartItem.id === item.id);

  if (existingItem) {
    // Увеличиваем количество, если товар уже есть
    existingItem.quantity += item.quantity || 1;
  } else {
    // Добавляем новый товар с количеством 1
    cart.push({ ...item, quantity: item.quantity || 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
};

export const updateCartItem = (id: number, delta: number) => {
  const cart = getCartItems();
  const updatedCart = cart.map((item: any) =>
    item.id === id
      ? { ...item, quantity: Math.max(item.quantity + delta, 1) } // Минимальное количество — 1
      : item
  );

  localStorage.setItem('cart', JSON.stringify(updatedCart));
};

export const removeCartItem = (id: number) => {
  const cart = getCartItems();
  const updatedCart = cart.filter((item: any) => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
};
