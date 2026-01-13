import { useCallback } from "react";
import { MdNorth } from "react-icons/md";

export default function BackToTop() {
  const onClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Back to top"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 enamel-button bg-gold text-primary w-12 h-12 sm:w-14 sm:h-14 rounded-sm flex items-center justify-center hover:scale-110 z-40 transition-transform"
    >
      <MdNorth className="text-xl sm:text-2xl" />
    </button>
  );
}
