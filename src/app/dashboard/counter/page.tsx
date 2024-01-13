 
import { CartCounter } from '@/src/shopping-cart/components/CartCounter';
import type { Metadata } from 'next'  
 
 
 
export const metadata: Metadata = {
  title: 'Counter Page',
  description: 'Simple Contador - cliente',
}

export default function CounterPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <span>Productos en el carrito</span>

      <CartCounter value={20} />

    </div>
  );
}