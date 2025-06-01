import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Props {
  navLinks: {
    name: string;
    href: string;
  }[];
}
export const SlideTabs = ({ navLinks }: Props) => {
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="relative mx-auto flex w-fit rounded-full  p-1"
    >
      {navLinks.map((item, i) => (
        <Tab href={item.href} key={i} setPosition={setPosition}>
          {item.name}
        </Tab>
      ))}

      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({
  children,
  setPosition,
  href,
}: {
  children: string;
  setPosition: Dispatch<SetStateAction<Position>>;
  href?: string;
}) => {
  const ref = useRef<null | HTMLLIElement>(null);
  const router = useRouter();

  return (
    <li
      onClick={() => router.push(href || "#")}
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white  md:px-5 md:py-3 md:text-base"
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }: { position: Position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-gradient-to-r from-blue-700 to-purple-700 md:h-12"
    />
  );
};

type Position = {
  left: number;
  width: number;
  opacity: number;
};
