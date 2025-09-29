import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { HiXMark } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";

const ModalContext = createContext();

function ProductModal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;

  useEffect(() => {
    if (openName) document.body.classList.add("modal-open");
    else document.body.classList.remove("modal-open");

    return () => document.body.classList.remove("modal-open");
  }, [openName]);

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close, true);

  return createPortal(
    <AnimatePresence>
      {name === openName && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={close}
          />

          <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.9, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-1/2 right-0 left-0 z-50 mx-auto flex max-h-[90vh] w-[90%] -translate-y-1/2 flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl md:top-1/2 md:bottom-auto md:left-1/2 md:max-h-[80vh] md:w-full md:max-w-2xl md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-xl"
            variants={{
              initial: { opacity: 0, scale: 0.9, y: 0 },
              animate: { opacity: 1, scale: 1, y: 0 },
              exit: { opacity: 0, scale: 0.9, y: 0 },
            }}
          >
            <div className="mx-auto my-3 h-1.5 w-12 rounded-full bg-gray-300 md:hidden" />

            <button
              className="absolute top-3 right-3 z-10 rounded-full bg-gray-100 p-1.5 text-gray-600 transition-colors hover:bg-gray-200"
              onClick={close}
            >
              <HiXMark className="h-5 w-5" />
            </button>

            <div className="flex-grow overflow-y-auto px-6 pb-6">
              {cloneElement(children, { onCloseModal: close })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}

ProductModal.Open = Open;
ProductModal.Window = Window;

export default ProductModal;
