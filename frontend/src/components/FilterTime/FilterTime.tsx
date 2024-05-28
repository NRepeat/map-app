import { parseTime } from "../../utils/parseTime";

const FilterTime = ({ time }: { time: number }) => {
  if (time >= 60) {
    const { hours, minutes } = parseTime(time);
    return (
      <strong>
        <span>
          {hours} h. {minutes} min.
        </span>
      </strong>
    );
  } else {
    return (
      <strong>
        <span>{time} s</span>
      </strong>
    );
  }
};
export default FilterTime;
