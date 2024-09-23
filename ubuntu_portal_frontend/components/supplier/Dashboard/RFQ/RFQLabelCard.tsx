export default function RFQLabelCard() {
  return (
    <div className="bg-gradient-to-r from-black via-gray-700 to-green-800 h-40 rounded-lg p-4 px-8 flex gap-8 items-center">
      {/* Text content */}
      <div className="w-auto flex items-center">
        <div className="p-4">
          <p className="text-white text-3xl">
            We got you the best proposal against your smart RFQ
          </p>
        </div>
      </div>
      {/* Image on the left end */}
      <div className="max-w-full min-w-2/3 w-auto h-2/3 items-end">
        <img
          src="/Wind_turbines.png"
          alt="wind turbine"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
