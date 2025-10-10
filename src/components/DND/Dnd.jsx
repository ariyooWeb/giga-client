"use client";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./style.scss";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const Dnd = () => {
  const [cards, setCards] = useState({
    sop: ["최효철", "김현정", "고우리"],
    alto: ["이형원", "김태현"],
    tenor: [],
    bariton: [],
    bass: [],
    percussion: [],
    all: [
      "박현서",
      "김현화",
      "김미사",
      "조계신",
      "지창선",
      "백이화",
      "김준",
      "윤종서",
      "김동현",
      "방원택",
      "정진영",
      "최명기",
      "이종성",
      "임수현",
      "손규원",
      "손윤호",
      "최지은",
      "강병범",
      "신진경",
      "오윤서",
      "맹상운",
    ],
  });

  console.log("cards왜이래", cards);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceList = Array.from(cards[source.droppableId]);
    const [movedItem] = sourceList.splice(source.index, 1);
    const destList = Array.from(cards[destination.droppableId]);
    destList.splice(destination.index, 0, movedItem);

    setCards({
      ...cards,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destList,
    });
  };

  return (
    <div className="dnd">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="dnd-layout">
          <div className="dnd-cards">
            {Object.keys(cards).map((cardId) => {
              if (cardId === "all") return;
              return (
                <Droppable
                  key={cardId}
                  droppableId={cardId}
                  isDropDisabled={false}
                  isCombineEnabled={false}
                  ignoreContainerClipping={false}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="dnd-cards-card"
                    >
                      <div className="dnd-cards-card-title">{cardId}</div>
                      {cards[cardId].map((item, index) => (
                        <Draggable
                          key={`${cardId}-${item}`}
                          draggableId={`${cardId}-${item}`}
                          index={index}
                        >
                          {(provided) => {
                            return (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="dnd-cards-card-task"
                              >
                                {item}
                              </div>
                            );
                          }}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              );
            })}
          </div>
          <div className="dnd-all">
            {Object.keys(cards).map((cardId) => {
              if (cardId !== "all") return;
              return (
                <Droppable
                  key={cardId}
                  droppableId={cardId}
                  isDropDisabled={false}
                  isCombineEnabled={false}
                  ignoreContainerClipping={false}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="dnd-all-card"
                    >
                      <div className="dnd-all-card-title">{cardId}</div>
                      <Input prefix={<SearchOutlined />} />
                      {cards[cardId].map((item, index) => (
                        <Draggable
                          key={`${cardId}-${item}`}
                          draggableId={`${cardId}-${item}`}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="dnd-all-card-task"
                            >
                              {item}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              );
            })}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Dnd;
