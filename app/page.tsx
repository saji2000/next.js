import Link from "next/link";
import ProductCart from "./components/ProductCart";

export default function Home() {
  return (
    <main>
      <p>Hello World!</p>
      <Link href="./users">users</Link>
      <ProductCart></ProductCart>
    </main>
  );
}
