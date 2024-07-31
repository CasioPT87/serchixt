import { PageValue } from "../../types";

interface ProtectedPaths {
  regExps: RegExp[],
  paths: Array<PageValue['path']>,
}

const protectedPaths: ProtectedPaths = {
  regExps: [new RegExp('/forbidden')],
  paths: ['/shipments'],
};

const onlyLogged = ({ path }: { path: PageValue['path']}): Boolean => {
  if (protectedPaths.paths.includes(path) || protectedPaths.regExps.some(regex => regex.test(path))) {
    return true;
  }
  return false
};

export {
    onlyLogged
}
