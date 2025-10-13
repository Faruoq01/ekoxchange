interface Props {
  subject: string;
  setSubject: (v: string) => void;
  message: string;
  setMessage: (v: string) => void;
}

export default function MessageForm({
  subject,
  setSubject,
  message,
  setMessage,
}: Props) {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
          Subject
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter subject"
          className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 pl-4 pr-4 py-3 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
          Message
        </label>
        <textarea
          rows={8}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message here..."
          className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 pl-4 pr-4 py-3 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-500"
        />
      </div>
    </>
  );
}
