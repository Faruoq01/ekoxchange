"use client";
import React from "react";
import clsx from "clsx";

type TextProps = {
  variant?: "heading" | "medium" | "body" | "label" | "muted";
  children: React.ReactNode;
  className?: string;
};

const Text: React.FC<TextProps> = ({
  variant = "body",
  children,
  className,
}) => {
  const base = "dark:text-text-dark text-text-light select-none";

  return (
    <>
      {variant === "heading" && (
        <h2
          className={clsx(
            "text-3xl font-bold text-heading-light dark:text-heading-dark",
            className
          )}
        >
          {children}
        </h2>
      )}
      {variant === "medium" && (
        <h2
          className={clsx(
            "text-xl font-bold text-heading-light dark:text-heading-dark",
            className
          )}
        >
          {children}
        </h2>
      )}
      {variant === "body" && (
        <p className={clsx("", base, className)}>{children}</p>
      )}
      {variant === "label" && (
        <label className={clsx("block text-sm font-medium", base, className)}>
          {children}
        </label>
      )}
      {variant === "muted" && (
        <p
          className={clsx(
            "text-sm text-gray-500 dark:text-gray-400",
            className
          )}
        >
          {children}
        </p>
      )}
    </>
  );
};

export default Text;
