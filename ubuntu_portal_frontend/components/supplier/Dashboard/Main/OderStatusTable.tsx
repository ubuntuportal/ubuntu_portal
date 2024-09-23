function OrderStatusTable() {
  // Placeholder data for now
  const orders = [
    { id: 1, product: "Product A", status: "Delivered", date: "2024-08-15" },
    { id: 2, product: "Product B", status: "Pending", date: "2024-08-16" },
    { id: 3, product: "Product C", status: "Shipped", date: "2024-08-17" },
  ];

  return (
    <div className="overflow-x-auto w-full">
      <table className=" bg-white w-full overflow-auto">
        <thead>
          <tr>
            <th className="py-2 text-left">Order ID</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="py-2 px-4">{order.id}</td>
              <td className="py-2 px-4">{order.product}</td>
              <td className="py-2 px-4">{order.status}</td>
              <td className="py-2 px-4">{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderStatusTable;
