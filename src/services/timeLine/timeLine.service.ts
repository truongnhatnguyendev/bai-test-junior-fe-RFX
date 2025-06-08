import { TimelineEntity } from "@/types/timeLine/timeLine.interface";
import { RestBaseService } from "../rest-base.service";

export class TimeLineService extends RestBaseService<TimelineEntity> {
  constructor() {
    super("http://localhost:3001", "timeline");
  }
}

export const timeLineService = new TimeLineService();
