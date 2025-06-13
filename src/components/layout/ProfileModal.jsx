import React from "react";
import { LogoutIcon } from "@/assets";

function ProfileModal({ isOpen, onClose, user, logout }) {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-start justify-end"
      onClick={handleBackdropClick}
    >
      <div
        className="absolute top-5 right-23 z-50 flex gap-2 px-6 py-8 border border-gray-300 rounded-xl bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-3 w-57">
          <div className="size-10">
            <img className="size-full rounded-full" src={user.image} />
          </div>

          <div className="text-sm">
            <p className="font-semibold text-nowrap overflow-hidden overflow-ellipsis">
              {user.name}
            </p>

            <p className="text-gray text-nowrap overflow-hidden overflow-ellipsis">
              {user.email}
            </p>
          </div>
        </div>

        <div className="size-6 mt-auto mb-1">
          <button onClick={logout} type="button">
            <LogoutIcon className="hover:cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
