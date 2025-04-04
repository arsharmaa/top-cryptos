import { motion, AnimatePresence } from "framer-motion";

interface ConfirmationModalProps {
  isOpen: boolean;
  selectedCrypto: string | null;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  selectedCrypto,
  onClose,
  onConfirm,
}) => {
  return (
    <AnimatePresence>
      {isOpen && selectedCrypto && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md p-6 bg-gradient-to-r from-gray-800 to-stone-700 border border-gray-500 rounded-md text-gray-200 shadow-md"
          >
            <h2 className="text-xl font-semibold text-center">
              Are you sure you want to leave this page?
            </h2>

            <div className="mt-5 flex justify-center gap-4">
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 transition-all text-white font-semibold rounded-md cursor-pointer"
              >
                Yes
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 transition-all text-white font-semibold rounded-md cursor-pointer"
              >
                No
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;
