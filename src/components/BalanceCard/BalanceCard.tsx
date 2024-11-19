import { component$ } from '@builder.io/qwik';
import '../../global.css';

export const BalanceCard = component$(() => {
  return (
    <div class="bg-cyan-200 p-6 rounded-lg shadow-lg">
      <div class="flex justify-between items-center">
        <div class="text-lg font-semibold">Your balance</div>
         <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-6 h-6 text-gray-400"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4.5c-7.1 0-10 6-10 6s2.9 6 10 6 10-6 10-6-2.9-6-10-6zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
          />
        </svg>
      </div>
      <div class="mt-2 text-2xl font-bold">₦ 103,920.12</div>
    </div>
  );
});