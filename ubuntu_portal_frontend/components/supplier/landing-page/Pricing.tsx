import React from 'react';

const plan = [
  {
    title: 'Basic Package',
    price: '59.00',
    features: ['lorem'],
  },
];

function Pricing() {
  return (
    <section>
      <div className="bg-cover bg-center bg-no-repeat bg-[url('../public/Background.png')] h-[300px]">
        <div className="h-full pt-8 bg-green-600/85">
          <div className="text-center font-semibold text-2xl md:text-3xl text-white">
            <p>Choose From Our Lowest</p>
            <p>Plans and Prices</p>
          </div>
          <p className="text-center mt-4 text-sm text-green-100">Our Pricing</p>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
