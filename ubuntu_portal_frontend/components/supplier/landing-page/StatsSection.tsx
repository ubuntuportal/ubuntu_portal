import React from 'react';

const stats = [
  {
    amount: '190+',
    description: 'Single platform for 190+ countries',
    icon: '/icons/world.png',
  },
  {
    amount: '15+',
    description: 'Tailored categories of the products',
    icon: '/icons/box.png',
  },
  {
    amount: '1000+',
    description: 'Variety of products in one domain',
    icon: '/icons/web.png',
  },
  {
    amount: '10+',
    description: 'Service sectors intergration for growing your business',
    icon: '/icons/stats.png',
  },
];

function StatsSection() {
  return (
    <section className="max-w-screen-xl mx-auto px-16 py-16">
      <p className="text-center text-gray-800 text-3xl font-bold md:text-4xl">
        Build Your Business With Us
      </p>
      <div className="flex justify-center mt-2">
        <p className="max-w-screen-sm text-gray-600 text-center text-pretty text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          distinctio velit, dolores dolor aperiam neque omnis facilis quibusdam?
        </p>
      </div>
      <div className="flex justify-between mt-14 max-w-screen-lg mx-auto">
        {stats.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 items-center justify-center"
          >
            <div className="size-16 p-4 bg-gray-100 rounded-full">
              <img src={item.icon} alt="" />
            </div>
            <p className="font-bold text-xl text-gray-800">{item.amount} </p>
            <p className="text-xs text-gray-600 w-44 text-center">
              {item.description}{' '}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StatsSection;
