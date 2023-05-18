
function ShoppingCartPage({ cartItems }) {

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id}>
          <img src={item.image} alt={item.name} />
          <h3>{item.name}</h3>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button>Increase Quantity</button>
          <button>Delete Item</button>
        </div>
      ))}
      <p>Total Amount: ${totalAmount}</p>
    </div>
  );
}

export default ShoppingCartPage;