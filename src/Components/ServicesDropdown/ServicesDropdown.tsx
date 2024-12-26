import React from "react";
import Link from "next/link";

const ServicesDropdown = () => {
  return (
    <div className="services-dropdown">   
      
          <Link href="/Delivery">Доставка</Link>
          <Link href="/Payment">Оплата</Link>
          <Link href="/Returns">Возврат</Link>
      
      
    </div>
  );
};

export default ServicesDropdown;


