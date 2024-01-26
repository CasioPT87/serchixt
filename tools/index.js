import routes from "../src/routes"

const getPageNameFromPath = ({ path }) => {
    const [pageName] = Object.entries(routes).find(([pageName, value]) => value.path === path)
    return pageName
}

const getAllRoutes = () => {
    return Object.values(routes).map(({ path }) => path)
}

const getInitialRenderData = async ({ pageName }) => {
    const page = routes[pageName]
    if (page?.pageComponent?.preloadFn) {
        return await page.pageComponent.preloadFn()
    }
    return null
}

export {
    getPageNameFromPath,
    getAllRoutes,
    getInitialRenderData
}