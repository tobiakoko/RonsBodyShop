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
      className="fixed bottom-8 right-8 enamel-button bg-gold text-primary w-14 h-14 rounded-sm flex items-center justify-center hover:scale-110 z-40"
    >
      <MdNorth />
    </button>
  );
}
