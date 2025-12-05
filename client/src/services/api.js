const API_BASE_URL = 'http://localhost:5023';

export const getProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Helper: searchProducts(query)
export const searchProducts = async (searchTerm) => {
  try {
    const url = searchTerm
      ? `${API_BASE_URL}/products/search?name=${encodeURIComponent(searchTerm)}`
      : `${API_BASE_URL}/products`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to search products");
    }

    return await response.json();
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
};

// Create order
export const createOrder = async (customerEmail, cartItems) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerEmail,
        items: cartItems.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Failed to create order");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// Get order by ID
export const getOrderById = async (orderId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch order");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};



// The frontend was importing `searchProducts` but the original file didn't export it.
// Provide a simple client-side search that fetches all products and filters by name.
/*export const searchProducts = async (query) => {
  try {
    const all = await getProducts();
    if (!query) return all;
    const q = String(query).toLowerCase();
    return all.filter((p) => (p.name || '').toLowerCase().includes(q));
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};*/

// Create Stripe checkout session
export const createCheckoutSession = async (customerEmail, cartItems) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/checkout/create-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerEmail,
          items: cartItems.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Failed to create checkout session");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
};

// Get order by Stripe session ID
export const getOrderBySessionId = async (sessionId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/orders/session/${sessionId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch order");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};
