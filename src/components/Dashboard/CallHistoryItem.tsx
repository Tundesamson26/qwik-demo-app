import { component$ } from '@builder.io/qwik';
import { qwikify$ } from '@builder.io/qwik-react';
import { FaPhone, FaEnvelope, FaVideo } from 'react-icons/fa';

const QwikFaPhone = qwikify$(FaPhone);
const QwikFaEnvelope = qwikify$(FaEnvelope);
const QwikFaVideo = qwikify$(FaVideo);

interface CallHistoryItemProps {
  number: string;
  time: string;
}

export const CallHistoryItem = component$<CallHistoryItemProps>(({ number, time }) => {
  return (
    <div class="flex justify-between items-center bg-white rounded-lg p-3 shadow">
      <div>
        <p class="font-bold">{number}</p>
        <p class="text-sm text-gray-600">{time}</p>
      </div>
      <div class="flex space-x-2">
<<<<<<< HEAD
        <QwikFaPhone className="w-5 h-5 text-green-500" />
        <QwikFaEnvelope className="w-5 h-5 text-blue-500" />
        <QwikFaVideo className="w-5 h-5 text-purple-500" />
=======
        <QwikFaPhone class="w-5 h-5 text-green-500" />
        <QwikFaEnvelope class="w-5 h-5 text-blue-500" />
        <QwikFaVideo class="w-5 h-5 text-purple-500" />
>>>>>>> 851c272 (latest commit)
      </div>
    </div>
  );
});
