"use client";
import { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
};

export const Modal = ({ isOpen, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700/30 backdrop-blur-sm">
      {children}
    </div>
  );
};
