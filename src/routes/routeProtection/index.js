const protectedPaths = {
  regExps: [],
  paths: ['/shipments'],
};

const onlyLogged = ({ path }) => {
  if (protectedPaths.paths.includes(path) || protectedPaths.regExps.some(regex => regex.test(path))) {
    return true;
  }
  return false
};

export {
    onlyLogged
}
