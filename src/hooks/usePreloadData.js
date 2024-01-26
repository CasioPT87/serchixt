import react, { useEffect, useState } from 'react'

export default function usePreloadData({ component, preloadDataProp = null }) {
    const [data, setData] = useState(preloadDataProp)   

    useEffect(() => {
        async function getData() {
            const { preloadFn } = component
            if (!preloadFn || preloadDataProp) return

            const data = await preloadFn()
            setData(data)
        }
        getData()
    }, [component, preloadDataProp])

    return data
}