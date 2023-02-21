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
      <div class="relative overflow-x-auto shadow-md border border-solid rounded-2xl border-[rgba(255,255,255,0.12)] my-6">
        <table
          ref={dragRef}
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <tbody>
            <tr class="">
              <td class="px-6 py-4">{item.id}</td>
              <td class="px-6 py-4">
                <div className="flex items-center gap-4">
                  <img
                    src={item?.photo}
                    alt={item.username}
                    className="rounded-lg h-[64px] w-[118px]"
                  />
                  <p className="font-thin text-xl max-w-[364px]">
                    {item.title}
                  </p>
                </div>
              </td>
              <td class="px-6 py-4">
                <div className="flex items-center gap-4">
                  <img
                    src={item?.photo}
                    alt={item.username}
                    className="rounded-full h-[24px] w-[24px]"
                  />
                  <p className="font-thin text-base text-[#DBFD51] w-[460px]">
                    {item.username}
                  </p>
                </div>
              </td>
              <td class="px-6 py-4 text-right flex items-center gap-2 h-[110px]">
                <p className="font-thin text-white text-xl max-w-[364px]">
                  {item.like}
                </p>
                <img src={arrow} alt="arrow up" className="rounded-lg" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SingleItem;
const DND_ITEM_TYPE = "row";
