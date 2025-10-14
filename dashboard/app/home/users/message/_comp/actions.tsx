import { Send, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface ActionsProps {
  isSubmitting?: boolean;
}

export default function Actions({ isSubmitting = false }: ActionsProps) {
  const router = useRouter();

  return (
    <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      {/* Cancel Button */}
      <button
        type="button"
        onClick={() => router.back()}
        disabled={isSubmitting}
        className="px-6 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Cancel
      </button>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary text-white px-4 py-2.5 rounded-lg hover:bg-primary/90 flex items-center gap-2 font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Send</span>
          </>
        )}
      </button>
    </div>
  );
}
