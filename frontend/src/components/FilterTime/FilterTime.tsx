import { parseTime } from "../../utils/parseTime";

const FilterTime = ({ time }: { time: number }) => {
	if (time >= 60) {
		const { hours, minutes } = parseTime(time)
		return (
			<strong>
				<p>
					{hours} h. {minutes} min.
				</p>
			</strong>
		);
	} else {
		return <strong><p>{time} s</p></strong>;
	}
};
export default FilterTime

