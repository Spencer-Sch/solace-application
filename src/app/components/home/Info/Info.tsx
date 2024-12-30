"use client";
import React, { useEffect, useState } from "react";
import MM_Section from "../../common/MM_Section";
import useScreenSize from "@/app/hooks/useScreenSize";

const itemsMap = new Map([
  [
    1,
    {
      id: 1,
      title: "FAQ 1 Title",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
  ],
  [
    2,
    {
      id: 2,
      title: "FAQ 2 Title",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
  ],
  [
    3,
    {
      id: 3,
      title: "FAQ 3 Title",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
  ],
  [
    4,
    {
      id: 4,
      title: "FAQ 4 Title",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
  ],
  [
    5,
    {
      id: 5,
      title: "FAQ 5 Title",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
  ],
  [
    6,
    {
      id: 6,
      title: "FAQ 6 Title",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
  ],
]);

const itemsArr = Array.from(itemsMap, ([key, { id, title, body }]) => ({
  id,
  title,
  body,
}));

const itemsBoolObj = Object.fromEntries(
  Array.from(itemsMap).map(([_, item]) => [item.id, false]),
);

const Info: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<{
    [key: number]: boolean;
  }>(itemsBoolObj);
  const { width: screenWidth } = useScreenSize();
  const isMobileScreen = screenWidth <= 768;

  // Effect to update the checked state based on screen size
  useEffect(() => {
    // Update the checked state for each item based on the new screen size
    const newCheckedState = itemsArr.reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: item.id === 1 && !isMobileScreen,
      }),
      {},
    );

    setCheckedItems(newCheckedState);
  }, [isMobileScreen]); // Depend on screenWidth to re-run this effect on resize

  function handleChange(id: number) {
    setCheckedItems((prev) => {
      if (prev[id] === false) {
        // if clicked FAQ is currently closed...
        let newCheckedItems: { [key: number]: boolean } = {};
        for (const [key, value] of Object.entries(prev)) {
          if (value) {
            // ...find the open one, close it...
            newCheckedItems[parseInt(key)] = false;
            continue;
          }
          // ...keep all others the same...
          newCheckedItems[parseInt(key)] = value;
        }
        // ...and set the clicked one to open
        newCheckedItems[id] = true;
        return newCheckedItems;
      }
      // if clicked FAQ is currently open
      return {
        ...prev,
        [id]: !prev[id],
      };
    });
  }

  function handleClick(id: number) {
    setCheckedItems((prev) => {
      if (prev[id]) {
        // if currently opened FAQ is clicked...
        // ...close it
        return {
          ...prev,
          [id]: false,
        };
      }
      // else, change nothing
      return {
        ...prev,
      };
    });
  }

  return (
    <MM_Section title="FAQs">
      <div className="flex justify-center">
        <div className="join join-vertical">
          {itemsArr.map((item) => (
            <div
              key={item.id}
              className={`collapse collapse-arrow join-item bg-primary-content border border-base-300`}
            >
              <input
                type="radio"
                name="my-accordion-4"
                checked={checkedItems[item.id]}
                onChange={() => handleChange(item.id)}
                onClick={() => handleClick(item.id)}
              />
              <div className="collapse-title text-xl font-medium text-primary">
                {item.title}
              </div>
              <div className="collapse-content">
                <div className="py-8">
                  <p className="text-justify">
                    {item.body.split("\n").map((line, index) => (
                      <span key={index} className="">
                        {line}
                        <br />
                        <br />
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MM_Section>
  );
};

export default Info;
