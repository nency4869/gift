import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LetterForm = ({ data = {}, onClose }) => {
  const formRef = useRef(null);

  const title = data?.title || "Thư chúc mừng 💌";
  const message = typeof data?.message === "string" ? data.message : "";

  // Đóng form khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        onClose?.();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-[999] p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          ref={formRef}
          className="
            relative bg-white/95 rounded-2xl shadow-xl
            text-center overflow-y-auto
            p-4 sm:p-6 md:p-8
            w-[90%] sm:w-[80%] md:w-[60%] lg:w-[45%] max-w-lg
            max-h-[80vh] sm:max-h-[75vh]
          "
          initial={{ y: 60, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 60, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#f9a8d4 transparent",
          }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-pink-600 mb-5">
            {title}
          </h2>

          <p
            className="
              text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed
              whitespace-pre-line px-2 sm:px-4 md:px-8
            "
          >
            {message}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LetterForm;
