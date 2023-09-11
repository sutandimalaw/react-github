import React, { useState, useRef } from "react";
import Chevron from "./Toggle";
import "./Accordion.css";

interface IAccorddion {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<IAccorddion> = ({ title, children }) => {
  const [active, setActive] = useState<string>("");
  const [height, setHeight] = useState<string>("0px");
  const [rotation, setRotation] = useState<string>("accordion__icon");

  const content = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sensitive = useRef<any>(null);

  const toggleAccordion = () => {
    setActive(active === "" ? "active" : "");
    setHeight(
      active === "active" ? "0px" : `${content?.current?.scrollHeight}px`
    );
    setRotation(
      active === "active" ? "accordion__icon" : "accordion__icon rotate"
    );
  };

  return (
    <div className="flex flex-col w-full p-2 m-1 -mt-3" ref={sensitive}>
      <button
        className={`bg-gray-400 text-gray-600 cursor-pointer flex items-center p-3 hover:bg-gray-200 accordion ${active}`}
        onClick={toggleAccordion}
      >
        <p className="accordion__title">{title}</p>
        <Chevron width={10} fill={"#777"} className={`${rotation}`} />
      </button>
      <div
        ref={content}
        style={{ maxHeight: `${height}` }}
        className="accordion__content"
      >
        <div className="px-2 py-2 flex gap-2 flex-col h-auto">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
