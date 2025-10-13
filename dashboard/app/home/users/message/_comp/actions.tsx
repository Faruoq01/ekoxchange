import { Send } from "lucide-react";

export default function Actions() {
  return (
    <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <button
        type="button"
        className="px-6 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium transition-colors"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-primary/90 flex items-center gap-2 font-medium transition-colors"
      >
        <Send className="w-4 h-4" />
        <span>Send</span>
      </button>
    </div>
  );
}
