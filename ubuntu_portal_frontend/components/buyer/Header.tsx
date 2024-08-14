import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className=" bg-emerald-600 h-28">
      <div className="flex items-center justify-around ml-24 mx-auto">
        <div className="w-5/12 pt-9 pb-9">
          <Input
            type="search"
            placeholder="Search essentials, groceries and more.."
            className="bg-white text-lg pt-5 pb-5  text-black"
          />
        </div>
        <div className="flex  justify-between">
          <div>
            <Button className="w-10/12 p-5 text-lg"> Login</Button>
          </div>
          <div>
            <Button className="w-10/12 p-5 text-lg"> Sign Up</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
