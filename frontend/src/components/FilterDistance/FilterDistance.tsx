const FilterDistance = ({ distance }: { distance: number }) => {
	if (distance >= 1000) {
		return (<p>
			{(distance / 1000).toFixed(3)} km
		</p>)
	} else {
		return (<p>{distance} m</p>)
	}
}

export default FilterDistance