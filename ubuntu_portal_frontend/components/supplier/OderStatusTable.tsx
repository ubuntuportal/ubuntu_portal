function OrderStatusTable() {
  // Placeholder data for now
  const orders = [
    { id: 1, product: "Product A", status: "Delivered", date: "2024-08-15" },
    { id: 2, product: "Product B", status: "Pending", date: "2024-08-16" },
    { id: 3, product: "Product C", status: "Shipped", date: "2024-08-17" },
  ];

  return (
    <div className="overflow-x-auto min-w-full">
      <table className=" bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Order ID</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="py-2 px-4 border-b">{order.id}</td>
              <td className="py-2 px-4 border-b">{order.product}</td>
              <td className="py-2 px-4 border-b">{order.status}</td>
              <td className="py-2 px-4 border-b">{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderStatusTable;
