import routes from "../src/routes"

const getPageNameFromPath = ({ path }) => {
    const [pageName] = Object.entries(routes).find(([pageName, value]) => value.path === path)
    return pageName
}

const getAllRoutes = () => {
    return Object.values(routes).map(({ path }) => path)
}

export {
    getPageNameFromPath,
    getAllRoutes
}