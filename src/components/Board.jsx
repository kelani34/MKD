import React, { useEffect } from "react";
import SingleItem from "./SingleItem";
import MkdSDK from "../utils/MkdSDK";
import { useState } from "react";
import Pagination from "./Pagination";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../utils/drag";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";

const Board = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.POST,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const moveRow = (dragIndex, hoverIndex) => {
    const dragRecord = data[dragIndex];
    setData(
      update(data, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRecord],
        ],
      })
    );
  };

  let sdk = new MkdSDK();
  useEffect(() => {
    const payload = { payload: {}, page: currentPage, limit: limit };
    const fetchData = async () => {
      const data = await sdk.callRestAPI(payload, "PAGINATE");
      setData(data.list);
      setTotal(data.num_pages);
      setLimit(data.limit);
    };
    fetchData();
  }, [currentPage]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="my-10">
        <div className="mt-10">
          <div className="flex w-full justify-between">
            <div className="w-[5%]">
              <p>#</p>
            </div>
            <div className="w-[40%]">
              <p>Title</p>
            </div>
            <div className="w-[35%]">
              <p>Author</p>
            </div>
            <div className="w-[10%] flex justify-end">
              <p>Most Liked</p>
            </div>
          </div>
          <div>
            {data.map((item, index) => (
              <SingleItem
                index={index}
                key={item.id}
                item={item}
                moveRow={moveRow}
              />
            ))}
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          data={total}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </DndProvider>
  );
};

export default Board;
