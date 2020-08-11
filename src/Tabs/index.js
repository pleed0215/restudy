import React, { useState } from "react";
import styled from "styled-components";

const TabsContainer = styled.div`
  width: 80%;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const TabContainer = styled.ul`
  width: 100%;
  height: 3vh;
  min-height: 50px;
  max-height: 50px;
  display: flex;
  list-style-type: none;
  margin-left: 30px;
  justify-content: flex-start;
  color: white;
  font-weight: 600;
`;

const TabPicker = styled.span`
  min-width: 150px;
  max-width: 150px;
  width: 10vw;
  height: 100%;
  padding-bottom: 10px;
  display: flex;
  background-color: ${({ selected }) =>
    selected ? "rgba(150,150,150, 0.3)" : "gray"};
  &:hover {
    background-color: ${({ selected }) => !selected && "#3498db"};
    transition: background-color 0.5s ease-in-out;
    ${({ selected }) => !selected && "cursor: pointer"};
  }
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-left: 2px;
  margin-right: 2px;
  font-size
`;

export const Tab = styled.li`
  text-align: center;
  font-size: 20px;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const TabContent = styled.div`
  width: 100%;
  height: auto;
`;

const TabContentContainer = styled.div`
  width: 100%;
  height: auto;
  min-height: 100px;
  background-color: rgba(150, 150, 150, 0.3);
  padding: 15px;
  border-radius: 20px;
`;

const useTabs = (initTab) => {
  const [currIndex, setCurrIndex] = useState(initTab);

  return {
    currIndex,
    changeTab: setCurrIndex,
  };
};

export const Tabs = ({ children }) => {
  let tabItems = [];
  let tabContentItems = [];
  const { currIndex, changeTab } = useTabs(0);

  children.forEach((child, index) => {
    if (child.type) {
      if (child.type.target === "li") tabItems.push(child);
      else if (child.type.target === "div") {
        tabContentItems.push(child);
      }
    }
  });

  return (
    <TabsContainer>
      <TabContainer>
        {tabItems.map((child, index) => (
          <TabPicker
            key={`tabs-${index}`}
            onClick={() => changeTab(index)}
            selected={currIndex === index ? true : false}
          >
            {child}
          </TabPicker>
        ))}
      </TabContainer>
      <TabContentContainer>{tabContentItems[currIndex]}</TabContentContainer>
    </TabsContainer>
  );
};
