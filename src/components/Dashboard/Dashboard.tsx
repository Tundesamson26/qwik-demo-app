/* eslint-disable qwik/no-react-props */
import {
  component$,
  useSignal,
  useResource$,
  Resource,
  useTask$,
} from "@builder.io/qwik";
import { qwikify$ } from "@builder.io/qwik-react";
import { FaBell, FaPhone, FaMicrophone, FaHome, FaUser } from "react-icons/fa";
import { CallHistoryItem } from "./CallHistoryItem";
import "../../global.css";

const QwikFaBell = qwikify$(FaBell);
const QwikFaPhone = qwikify$(FaPhone);
const QwikFaMicrophone = qwikify$(FaMicrophone);
const QwikFaHome = qwikify$(FaHome);
const QwikFaUser = qwikify$(FaUser);

interface DashboardProps {
  userName: string;
  phoneNumber: string;
  balance: number;
}

export const Dashboard = component$<DashboardProps>(
  ({
    userName = "Sam!",
    phoneNumber = "+234 700 9876 543",
    balance = 103920.12,
  }) => {
    // assign default notification state to 0
    const notifications = useSignal(0);

    // load call history data from JSON file
    const callHistoryResource = useResource$<
      { number: string; time: string }[]
    >(async () => {
      const response = await fetch("/src/data/callHistory.json");
      return response.json();
    });

    // Simulate new notifications every 5 seconds
    useTask$(() => {
      const interval = setInterval(() => {
        notifications.value += 1;
      }, 5000);

      return () => clearInterval(interval);
    });

    return (
      <div class="flex flex-col h-screen bg-sky-100 p-4">
        <header class="flex justify-between items-center mb-6">
          <div>
            <h1 class="text-2xl font-bold">Hello {userName}</h1>
            <p class="text-gray-600">{phoneNumber}</p>
          </div>
          <div class="flex items-center">
            <div class="relative">
              <QwikFaBell className="w-6 h-6 mr-2" />
              {notifications.value > 0 && (
                <span class="absolute top-0 right-0 block w-4 h-4 text-xs leading-none text-center text-white bg-red-600 rounded-full">
                  {notifications.value}
                </span>
              )}
            </div>
            <div class="w-10 h-10 rounded-full bg-yellow-500 ml-2"></div>
          </div>
        </header>

        <section class="bg-white rounded-lg p-4 mb-6 shadow">
          <h2 class="text-gray-500 mb-2">Your balance</h2>
          <p class="text-3xl font-bold">₦ {balance.toFixed(2)}</p>
        </section>

        <section class="grid grid-cols-2 gap-4 mb-6">
          <div class="bg-white rounded-lg p-4 shadow">
            <QwikFaPhone className="w-6 h-6 mb-2 text-blue-500" />
            <h3 class="font-bold mb-1">Call Management</h3>
            <p class="text-sm text-gray-600">
              Organize your calls, enjoy call transfer, and routing.
            </p>
          </div>
          <div class="bg-white rounded-lg p-4 shadow">
            <QwikFaMicrophone className="w-6 h-6 mb-2 text-green-500" />
            <h3 class="font-bold mb-1">Interactive Voice Response</h3>
            <p class="text-sm text-gray-600">
              Guide callers with voice options.
            </p>
          </div>
        </section>

        <section class="flex-grow overflow-y-auto">
          <h2 class="font-bold mb-4">Call History</h2>
          <div class="space-y-4">
            <Resource
              value={callHistoryResource}
              onPending={() => <p>Loading call history...</p>}
              onRejected={(error) => (
                <p>Error loading call history: {error.message}</p>
              )}
              onResolved={(callHistory) => (
                <>
                  {callHistory.map((item, index) => (
                    <CallHistoryItem
                      key={index}
                      number={item.number}
                      time={item.time}
                    />
                  ))}
                </>
              )}
            />
          </div>
        </section>

        <nav class="flex justify-between mt-6">
          <button class="flex-1 mr-2 bg-white rounded-lg p-2 shadow flex items-center justify-center">
            <QwikFaHome className="w-5 h-5 mr-2 text-cyan-500" />
            Home
          </button>
          <button class="flex-1 mr-2 bg-white rounded-lg p-2 shadow flex items-center justify-center">
            <QwikFaPhone className="w-5 h-5 mr-2 text-green-500" />
            Phone
          </button>
          <button class="flex-1 mr-2 bg-white rounded-lg p-2 shadow flex items-center justify-center">
            <QwikFaUser className="w-5 h-5 mr-2 text-sky-500" />
            Account
          </button>
        </nav>
      </div>
    );
  }
);
