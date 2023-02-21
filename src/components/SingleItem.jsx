import React from "react";
import arrow from "../images/arrow.png";
import { DndProvider, useDrag, useDrop } from "react-dnd";

const SingleItem = ({ item, moveRow, index }) => {
  const dropRef = React.useRef(null);
  const dragRef = React.useRef(null);
  const [, drop] = useDrop({
    accept: DND_ITEM_TYPE,
    hover(item, monitor) {
      if (!dropRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = dropRef.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveRow(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    item: { index },
    type: DND_ITEM_TYPE,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  preview(drop(dropRef));
  drag(dragRef);
  return (
    <div ref={dropRef} style={{ opacity }}>
      <div
        ref={dragRef}
        className="flex w-full justify-between p-2 font-[100] font-base border border-[#e5e5e5] rounded-[10px] my-3"
      >
        <div className="w-[5%] ">
          <p>{item.id}</p>
        </div>
        <div className="w-[40%] flex gap-3">
          <div className="w-[20%] ">
            <img src={item?.photo} alt={item.username} className="rounded-lg" />
          </div>
          <p className="text-white">{item.title}</p>
        </div>
        <div className="w-[35%] flex gap-4">
          <div className="rounded-full ">
            <img
              src={item?.photo}
              alt={item.username}
              className="rounded-full h-[24px] w-[24px]"
            />
          </div>
          <p className="text-sec font-[100]">{item.username}</p>
        </div>
        <div className="w-[10%] flex justify-end gap-3 items-center">
          <p className="text-white">{item.like}</p>
          <div className="">
            <img
              src={arrow}
              alt="arrow up"
              className="rounded-full w-[10px] h-[12.5px] object-contain "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
const DND_ITEM_TYPE = "row";
