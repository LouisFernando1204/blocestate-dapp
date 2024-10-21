/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useState, useEffect } from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

const courseCategory = [
  { id: 1, type: 'House' },
  { id: 2, type: 'Apartment' },
  { id: 3, type: 'Shophouse' },
  { id: 4, type: 'Garden'}
];

export default function SelectMenus({ setType }) {
  const [selected, setSelected] = useState(courseCategory[0]);

  useEffect(() => {
    if (typeof setType === 'function') {
      setType(selected.id); // Call setType if it's a function
    }
  }, [selected, setType]);

  const radius = 100; // Change this to increase the radius of the hover effect
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <Listbox value={selected} onChange={setSelected}>
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
        <ListboxButton className="file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-neutral-400
          focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400
          disabled:cursor-not-allowed disabled:opacity-50
          group-hover/input:shadow-none transition duration-400 shadow-input relative w-full cursor-default rounded-md bg-gray-50 py-2 pl-3 pr-10 text-left text-black focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm sm:leading-6"
        >
          <span className="flex items-center">
            <span className="block truncate">{selected.type}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
          </span>
        </ListboxButton>
        <ListboxOptions
          transition
          className="z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          {courseCategory.map((category) => (
            <ListboxOption
              key={category.id}
              value={category}
              className="group relative w-full cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-blue-500 data-[focus]:text-white"
            >
              <div className="flex items-center">
                <span className="block truncate font-normal group-data-[selected]:font-semibold">
                  {category.type}
                </span>
              </div>
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-500 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                <CheckIcon aria-hidden="true" className="h-5 w-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </motion.div>
    </Listbox>
  );
}