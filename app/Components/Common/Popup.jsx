import React from "react";

const icons = {
  success: "✅",
  error: "❌",
  warning: "⚠️",
  info: "ℹ️",
};

export default function PopupModal({
  isOpen,
  onClose,
  title = "Popup Title",
  message = "Message goes here.",
  type = "info",
  isConfirm = false,
  onConfirm,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className={`bg-white rounded-lg w-96 p-6 text-center border-t-4 border-${getColor(
          type
        )}-500 shadow-lg`}
      >
        <div className="text-4xl mb-2">{icons[type]}</div>
        <h2 className="text-xl font-bold mb-2 text-gray-800">{title}</h2>
        <p className="text-gray-600 mb-4">{message}</p>
        <div>
          {isConfirm ? (
            <>
              <button
                onClick={onConfirm}
                className={`bg-${getColor(
                  type
                )}-600 text-white px-4 py-2 rounded mr-2`}
              >
                Confirm
              </button>
              <button
                onClick={onClose}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className={`${bgColors[type]} text-white px-4 py-2 rounded`}
            >
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Tailwind doesn’t support dynamic class names like `bg-${color}`
// So map types to colors manually:
function getColor(type) {
  switch (type) {
    case "success":
      return "green";
    case "error":
      return "red";
    case "warning":
      return "yellow";
    case "info":
      return "blue";
  }
}

const bgColors = {
  success: 'bg-green-600',
  error: 'bg-red-600',
  warning: 'bg-yellow-600',
  info: 'bg-blue-600',
};