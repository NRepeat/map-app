import { RouteType } from "../types/types";

export const sort = (
  routes: RouteType[],
  toggleSort: {
    distance: boolean;
    desc: boolean;
  }
) => {
  const routesCopy = [...routes];

  if (toggleSort.distance) {
    routesCopy.sort((a, b) => {
      const distanceDiff =
        a.properties.segments[0].distance - b.properties.segments[0].distance;
      return toggleSort.desc ? -distanceDiff : distanceDiff;
    });
  } else {
    routesCopy.sort((a, b) => {
      const durationDiff =
        a.properties.segments[0].duration - b.properties.segments[0].duration;
      return toggleSort.desc ? -durationDiff : durationDiff;
    });
  }

  return routesCopy;
};
