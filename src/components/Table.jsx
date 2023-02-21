import React, { useEffect } from "react";
import SingleItem from "./List";
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
          <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <tbody>
                <tr class="">
                  <td class="px-6 w-[90px] font-thin">#</td>
                  <td class="px-6">
                    <div className=" items-center gap-4">
                      <p className="font-thin text-base w-[444px]">Title</p>
                    </div>
                  </td>
                  <td class="px-6">
                    <div className=" items-center gap-4">
                      <p className="font-thin text-base w-[360px]">Author</p>
                    </div>
                  </td>
                  <td class="px-6 text-right  items-center gap-2">
                    <p className="font-thin text-base max-w-[364px]">
                      <select className=" bg-none outline-none border-none">
                        <option>Most Liked </option>
                        <option>Least Liked </option>
                      </select>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
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
