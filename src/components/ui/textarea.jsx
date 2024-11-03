/* eslint-disable prefer-const */
// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input
"use client";
import React, { useState, forwardRef } from "react";
import { cn } from "../../lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

const TextArea = forwardRef(({ className, ...props }, ref) => {
  const radius = 100; // change this to increase the radius of the hover effect
  const [visible, setVisible] = useState(false);

  // Initialize motion values for mouse X and Y positions
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();

    // Update the mouse X and Y positions
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      style={{
        background: useMotionTemplate`
          radial-gradient(
            ${visible ? `${radius}px` : "0px"} circle at ${mouseX}px ${mouseY}px,
            var(--blue-500),
            transparent 80%
          )
        `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="p-[2px] rounded-lg transition duration-300 group/input"
    >
      <textarea
        className={cn(
          `flex w-full border-none bg-gray-50 text-black shadow-input rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-neutral-400
          focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400
          disabled:cursor-not-allowed disabled:opacity-50
          group-hover/input:shadow-none transition duration-400`,
          className
        )}
        ref={ref}
        {...props}
      />
    </motion.div>
  );
});

TextArea.displayName = "TextArea";

export { TextArea };
