import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaAward, FaCreditCard, FaShareAlt } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { LiaFlagUsaSolid } from "react-icons/lia";
export default function Products({
  params,
}: {
  params: { productId: string };
}) {
  return (
    <div className="flex gap-6 pt-6 w-[90%]">
      <div className="flex-initial content-center w-96 relative rounded-2xl border-2">
        <Image
          src="/img/image.png"
          alt={params.productId}
          width={300}
          height={300}
          className="mx-auto"
        />
      </div>
      <div className="flex-1">
        <h1 className="text-lg font-bold w-[75%]">
          Product name for maximum two text lines title could be very long
        </h1>
        <span>
          <FaShareAlt className="inline-block" />
        </span>
        <p className="text-sm py-6">
          Product name for maximum two text lines title could be very long
        </p>

        <h2 className="text-4xl font-bold text-[#7fb4cf]">$30</h2>
        <div className="flex gap-5 py-6">
          <Button>Start Order</Button>
          <Button className="bg-[#7fb4cf] hover:bg-[#7badc6]">
            Add to Cart
          </Button>
        </div>
        <div className="grid w-[80%] grid-cols-2 gap-2 text-xs font-semibold">
          <div>
            <p>
              <FaTruckFast className="text-2xl mr-2 inline-block text-[#222]" />
              Free Shipping on order from $500
            </p>
          </div>
          <div>
            <p>
              <FaAward className="text-2xl mr-2 inline-block text-[#222]" />3
              Years Warranty and Support 24/7
            </p>
          </div>
          <div>
            <p>
              <FaCreditCard className="text-2xl mr-2 inline-block text-[#222]" />
              We accept credit cards, paypal
            </p>
          </div>
          <div>
            <p>
              <LiaFlagUsaSolid className="text-2xl mr-2 inline-block text-[#222]" />
              Products Made in the United States
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
