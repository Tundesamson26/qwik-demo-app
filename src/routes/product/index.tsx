import { component$ } from "@builder.io/qwik";
import { Product } from "~/components/Products/Product";

export default component$(() => {
  return (
    <div>
      <Product />
    </div>
  );
});
