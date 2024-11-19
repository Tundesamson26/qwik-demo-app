import { component$ } from "@builder.io/qwik";
import { Dashboard } from "~/components/Dashboard/Dashboard";

export default component$(() => {
  return (
    <>
      <Dashboard
        userName="Sam!"
        phoneNumber="+234 700 9876 543"
        balance={103920.12}
      />
    </>
  );
});
