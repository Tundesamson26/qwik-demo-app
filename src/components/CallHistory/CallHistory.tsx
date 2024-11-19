/* eslint-disable qwik/no-react-props */
// src/components/CallHistory/CallHistory.tsx
import { component$ } from '@builder.io/qwik';
import { FaPhoneAlt, FaEnvelope, FaVideo } from 'react-icons/fa';
import { qwikify$ } from '@builder.io/qwik-react';
import '../../global.css';

// Wrap the React icon using qwikify
const QwikFaPhoneAlt = qwikify$(FaPhoneAlt);
const QwikFaEnvelope = qwikify$(FaEnvelope);
const QwikFaVideo = qwikify$(FaVideo);

export const CallHistory = component$(() => {
  const calls = [
    { number: '+234 704 5112 234', time: '08:10am Wed 14 Jan, 2024' },
    { number: '+234 704 5112 234', time: '08:10am Wed 14 Jan, 2024' },
    { number: '+234 704 5112 234', time: '08:10am Wed 14 Jan, 2024' },
    { number: '+234 704 5112 234', time: '08:10am Wed 14 Jan, 2024' },
  ];

  return (
    <div class="space-y-4">
      {calls.map((call, index) => (
        <div key={index} class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
          <div class="flex items-center space-x-4">
            <QwikFaPhoneAlt className="text-green-500" />
            <div>
              <p class="text-lg font-semibold">{call.number}</p>
              <p class="text-sm text-gray-500">{call.time}</p>
            </div>
          </div>
          <div class="flex space-x-4">
            <QwikFaPhoneAlt className="text-blue-500 cursor-pointer" />
            <QwikFaEnvelope className="text-blue-500 cursor-pointer" />
            <QwikFaVideo className="text-blue-500 cursor-pointer" />
          </div>
        </div>
      ))}
    </div>
  );
});
