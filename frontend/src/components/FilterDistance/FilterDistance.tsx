type UnitsType = 'm' | 'km' | 'mi';

const FilterDistance = ({ distance, units = 'm' }: { distance: number, units?: UnitsType }) => {
	const convertDistance = (distance: number, units: UnitsType) => {
		switch (units) {
			case 'km':
				if (distance >= 1000) {
					return `${(distance / 1000).toFixed(3)} km`;
				} else {
					return `${distance}${units}`;
				}
			case 'mi':
				if (distance >= 1609.34) {
					return `${(distance / 1609.34).toFixed(3)} mi`;
				} else {
					return `${distance}${units}`;
				}
			case 'm':
			default:
				if (distance >= 1000) {
					return `${(distance / 1000).toFixed(3)} km`;
				} else {
					return `${distance}${units}`;
				}
		}
	};

	return (
		<strong>
			<span>{convertDistance(distance, units)}</span>
		</strong>
	);
};

export default FilterDistance;
