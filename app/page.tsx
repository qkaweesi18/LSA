import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-yellow-300 p-8 font-mono">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold mb-8 text-black transform -rotate-2 bg-white p-4 inline-block">West Park Services</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <ServiceCard
            title="Package Delivery & Collection"
            description="We deliver and collect packages in the West Park area."
            icon="📦"
            buttonText="Order"
            href="/location-select"
          />
          <ServiceCard
            title="Cake Pre-orders"
            description="Order cakes! Available when 12 pre-orders are reached."
            icon="🎂"
            buttonText="Preorder Now"
            href="/cake-preorder"
          />
          <ServiceCard
            title="Password Recovery"
            description="We help you recover forgotten passwords on Android."
            icon="🔑"
            buttonText="Learn More"
            href="/password-recovery"
          />
          <div className="bg-blue-500 p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-bold mb-4 text-white">Contact Us</h2>
            <Link href="/contact" passHref>
              <Button className="w-full bg-white text-blue-500 hover:bg-blue-100 font-bold py-2 px-4 border-4 border-black">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>

        <footer className="text-center bg-black text-white p-4 transform -rotate-1">
          <p>&copy; 2023 West Park Services. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  buttonText: string;
  href: string;
}

function ServiceCard({ title, description, icon, buttonText, href }: ServiceCardProps) {
  return (
    <div className="bg-white p-6 transform -rotate-2 hover:rotate-0 transition-transform duration-300 border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
      <h2 className="text-3xl font-bold mb-4 flex items-center">
        <span className="mr-2 text-4xl">{icon}</span>
        {title}
      </h2>
      <p className="text-lg mb-4">{description}</p>
      <Link href={href} passHref>
        <Button className="w-full bg-black text-white hover:bg-gray-800 font-bold py-2 px-4 border-2 border-black">
          {buttonText}
        </Button>
      </Link>
    </div>
  );
}