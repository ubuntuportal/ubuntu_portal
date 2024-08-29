// import React from "react";
// import { Input } from "../ui/input";
// import Image from "next/image";
// import logo from "@/public/Logo.png";

// export default function Footer() {
//   return (
//     <footer className=" bottom-0  bg-gradient-to-b from-[#29964C] to-[#0D3018]   h-96">
//       <div className="flex gap-[1vw] mx-20 pt-16">
//         <div className="flex-[1.5] mr-7">
//           <div className=" mb-8 text-white font-extrabold leading-6">
//             <Image src={logo} alt="logo" />
//           </div>
//           <p className="text-white text-sm ">
//             We are a platform that connects buyers and suppliers.
//           </p>
//         </div>
//         <div className="flex-1 ">
//           <h1 className=" mb-2 text-white text-base">My Account</h1>
//           <p className="text-white pt-4 text-sm">
//             <a href="#" className="">
//               Authors
//             </a>
//           </p>
//           <p className="text-white pt-4 text-sm">
//             <a href="#" className="">
//               Collection
//             </a>
//           </p>
//           <p className="text-white pt-4 text-sm">
//             <a href="#" className="">
//               Author Profile
//             </a>
//           </p>
//           <p className="text-white pt-4 text-sm">
//             <a href="#" className="">
//               Create Collection
//             </a>
//           </p>
//         </div>
//         <div className="flex-1">
//           <h1 className=" mb-2 text-white text-base">Resources</h1>
//           <p className="text-white pt-4 text-sm">
//             <a href="#" className="">
//               Help & Support
//             </a>
//           </p>
//           <p className="text-white pt-4 text-sm">
//             <a href="#" className="">
//               Live Auctions
//             </a>
//           </p>
//           <p className="text-white pt-4 text-sm">
//             <a href="#" className="">
//               Item Details
//             </a>
//           </p>
//           <p className="text-white pt-4 text-sm">
//             <a href="#" className="">
//               Activities
//             </a>
//           </p>
//         </div>
//         <div className="flex-1">
//           <h1 className=" mb-2 text-white text-base">Communities</h1>
//           <p className="text-white pt-4 text-sm">
//             <a href="#" className="">
//               About Us
//             </a>
//           </p>
//           <p className="text-white pt-4 text-sm">
//             <a href="#" className="">
//               Contact Us
//             </a>
//           </p>
//           <p className="text-white pt-4 text-sm">
//             <a href="#" className="">
//               Our Blog
//             </a>
//           </p>
//           <p className="text-white pt-4 text-sm">
//             <a href="#" className="">
//               Discover
//             </a>
//           </p>
//         </div>
//         <div className="flex-1">
//           <h1 className=" mb-2 text-white text-base">Subscribe</h1>
//           <Input
//             placeholder="info@yourgmail.com"
//             className="border-white text-white"
//           />
//         </div>
//       </div>
//     </footer>
//   );
// }

import React from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import logo from "@/public/Logo.png";

export default function Footer() {
  return (
    <footer className="bottom-0 bg-gradient-to-b from-[#29964C] to-[#0D3018] text-white">
      <div className="container mx-auto px-4 py-8 flex flex-wrap justify-between md:flex-col md:items-center">
        <div className="flex-[1.5] mr-7 mb-8 md:mb-0">
          <div className="mb-8">
            <Image src={logo} alt="logo" />
          </div>
          <p className="text-sm">
            We are a platform that connects buyers and suppliers.
          </p>
        </div>
        <div className="flex-1 space-y-4 md:w-full">
          <h1 className="text-base mb-2">My Account</h1>
          <ul className="list-none space-y-2">
            <li>
              <a href="#" className="text-sm hover:underline">
                Authors
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:underline">
                Collection
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:underline">
                Author Profile
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:underline">
                Create Collection
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-1 space-y-4 md:w-full">
          <h1 className="text-base mb-2">Resources</h1>
          <ul className="list-none space-y-2">
            <li>
              <a href="#" className="text-sm hover:underline">
                Help & Support
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:underline">
                Live Auctions
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:underline">
                Item Details
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:underline">
                Activities
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-1 space-y-4 md:w-full">
          <h1 className="text-base mb-2">Communities</h1>
          <ul className="list-none space-y-2">
            <li>
              <a href="#" className="text-sm hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:underline">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:underline">
                Our Blog
              </a>
            </li>
            <li>
              <a href="#" className="text-sm hover:underline">
                Discover
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-1 space-y-4 md:w-full">
          <h1 className="text-base mb-2">Subscribe</h1>
          <Input
            placeholder="info@yourgmail.com"
            className="border-white text-white"
          />
        </div>
      </div>
    </footer>
  );
}
