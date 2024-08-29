function StatsCard({ icon, value, label }) {
  return (
    <div className="rounded-2xl bg-white p-4 flex-1  min-w-[130px]">
      <div className="flex">
        <img src={icon} alt="Order" className="h-12 w-12 my-4 mr-4" />
        <div className="my-4">
          <h1 className="text-2xl font-bold ">{value}</h1>
          <p className="mt-0 capitalize text-sm font-serif text-gray-500">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}
export default StatsCard;
