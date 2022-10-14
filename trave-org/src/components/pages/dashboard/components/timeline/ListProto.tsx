import { css } from "@emotion/react";
import { BiCar, BiWalk } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import { Reorder, motion } from "framer-motion";

const Marker = ({ children }: { children: any }) => {
  return (
    <div
      css={css`
        width: 20px;
        height: 20px;
        border-radius: 50% 50% 50% 0;
        background: #00cae9;
        transform: rotate(-45deg);
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <span
        css={css`
          transform: rotate(45deg);
        `}
      >
        {children}
      </span>
    </div>
  );
};
const ListProtoItem = ({
  index,
  name,
  address,
  startTime,
  endTime,
}: {
  index: number;
  name: string;
  address: string;
  startTime: string;
  endTime: string;
}) => {
  return (
    <div
      css={css`
        position: relative;
        margin-left: 30px;
        background-color: rgba(255, 255, 255);
        padding: 7px 14px;
        border-radius: 6px;
        width: 250px;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.08);
      `}
    >
      <span
        css={css`
          width: 2px;
          height: 100%;
          background: #dee2e6;
          left: -30px;
          top: 0;
          position: absolute;
          &:before,
          &:after {
            content: "";
            width: 8px;
            height: 8px;
            border-radius: 50%;
            border: 2px solid #dee2e6;
            position: absolute;
            background: #86b7e7;
            left: -4px;
          }
          &:before {
            top: 0;
          }
          &:after {
            top: 100%;
          }
          span {
            position: absolute;
            font-size: 10px;
            left: -35px;
            font-weight: bold;
          }
        `}
      >
        <span
          css={css`
            top: 0;
          `}
        >
          {startTime}
        </span>
        <span
          css={css`
            top: 100%;
          `}
        >
         {endTime}
        </span>
      </span>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 7px;
        `}
      >
        <Marker>{index + 1}</Marker>
        <div>
          <div
            css={css`
              font-weight: 600;
              font-size: 12px;
              color: black;
            `}
          >
            {name}
          </div>
          <div
            css={css`
              font-weight: 400;
            `}
          >
            {address}
          </div>
        </div>
      </div>
    </div>
  );
};

const ListProto = ({
  data: outerData,
  updateData,
}: {
  data: any[];
  updateData: (newData: any) => void;
}) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResult, setSearchResult] =
    useState<kakao.maps.services.PlacesSearchResult>();

  useEffect(() => {
    if (searchKeyword === "") {
      setSearchResult(undefined);
    }

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(searchKeyword, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        setSearchResult(data);
      }
    });
  }, [searchKeyword]);
  const [isGrabbed, setIsGrabbed] = useState(false);

  const [internalData, setInternalData] = useState(outerData);

  useEffect(() => {
    console.log("Internal Updated");
  }, [internalData]);

  useEffect(() => {
    console.log("Outer Updated", outerData);
    setInternalData(outerData);
  }, [outerData]);

  return (
    <div
      css={css`
        background: white;
        display: flex;
        flex-grow: 1;
      `}
    >
      <Reorder.Group
        axis="y"
        values={internalData}
        onReorder={setInternalData}
        as="ul"
        layoutScroll
        style={{ overflowY: "scroll" }}
        css={css`
          margin: 0;
          list-style: none;
          position: relative;
          padding: 0px 50px;
          color: #495057;
          font-size: 13px;
          &:before {
            content: "";
            width: 1px;
            height: 100%;
            position: absolute;
            border-left: 2px dashed #dee2e6;
          }
        `}
      >
        {internalData.map((item, i) => (
          <Reorder.Item
           key={item.scheduleId}
            value={item}
            onDragStart={() => setIsGrabbed(true)}
            onDragEnd={() => {
              setIsGrabbed(false);
              updateData(internalData);
            }}
          >
            {i > 0 && (
              <div
                css={css`
                  font-size: 12px;
                  margin: 10px 0 10px 30px;
                  height: 22px;
                  display: flex;
                  align-items: center;
                `}
              >
                {!isGrabbed && (
                  <>
                    <BiCar /> 14km · 5분
                  </>
                )}
              </div>
            )}
              <ListProtoItem
              index={i}
              name={item.place.placeName}
              address={item.place.address_name}
              startTime="10:00"
              endTime="12:00"
            />
          </Reorder.Item>
        ))}
         <div
          css={css`
            margin-left: 30px;
            margin-top: 10px;
          `}
        >
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />

          <div>
            {searchResult &&
              searchResult.map((result) => {
                return <div>{result.place_name}</div>;
              })}
          </div>
        </div>
      </Reorder.Group>
    </div>
  );
};

export default ListProto;