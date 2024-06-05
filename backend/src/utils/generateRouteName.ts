export function generateRouteName(routes) {
  // Check if the input is an array
  if (!Array.isArray(routes)) {
    throw new Error("Input must be an array of route objects");
  }

  const routeNames = routes.map((route) => {
    const routeName = [];

    route.properties.segments.forEach((segment) => {
      segment.steps.forEach((step) => {
        if (step.name && step.name !== "-" && !routeName.includes(step.name)) {
          routeName.push(step.name);
        }
      });
    });
    if (routeName.length > 3) {
      const middleIndex = Math.floor(routeName.length / 2);
      const newArr = [
        routeName[0],
        routeName[middleIndex],
        routeName[routeName.length - 1],
      ];
      return newArr.join(" - ");
    }

    return routeName.join(" - ");
  });
  return routeNames;
}
