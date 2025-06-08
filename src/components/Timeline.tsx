import { useFetch } from "@/hooks/useFetch";
import { timeLineService } from "@/services/timeLine/timeLine.service";
import { TimelineEntity } from "@/types/timeLine/timeLine.interface";
import React from "react";
import { SkeletonTimeLine } from "./skeleton/skeletonTimeLine";

export const Timeline: React.FC = () => {
  const { datas, loading } = useFetch<TimelineEntity>(timeLineService);

  return (
    <div>
      {loading ? (
        Array.from({ length: 4 }).map((_, i) => <SkeletonTimeLine key={i} />)
      ) : datas.length === 0 ? (
        <div className="col-span-full flex items-center justify-center h-full">
          <span className="text-sm font-semibold text-gray-500">
            No data found
          </span>
        </div>
      ) : (
        datas?.map((item, index) => (
          <div
            key={item.id}
            className="space-y-3 pl-2 text-sm text-muted-foreground"
          >
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2">
                <div
                  className={`w-[15px] h-[15px] rounded-full ${
                    index % 2 === 1 ? "bg-primary" : "bg-green-500"
                  } `}
                ></div>
                <div>{item.company}</div>
                <div>{item.name}</div>
                <div>{item.status}</div>
                <div>
                  @ {item.date} {item.time}
                </div>
              </div>
              {index !== datas?.length - 1 && (
                <div className="w-px ml-[7px] bg-gray-400 h-4 my-1"></div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
