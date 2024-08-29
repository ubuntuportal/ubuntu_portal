function StatsCard() {
  return (
    <div className="rounded-2xl bg-white p-4 flex-1  min-w-[130px]">
      <div className="flex">
        <img
          src="/Icon_Order.png"
          alt="Order"
          className="h-12 w-12 my-4 mr-4"
        />
        <div className="my-4">
          <h1 className="text-2xl font-bold ">75</h1>
          <h2 className="mt-0 capitalize text-sm font-normal text-gray-500">
            Total order
          </h2>
        </div>
      </div>
    </div>
  );
}
export default StatsCard;
