import React from 'react'
import { lazy } from 'react';
import { useAsync } from "react-async"

// You can use async/await or any function that returns a Promise
const loadPlayer = async ({ playerId }, { signal }) => {
  const res = await new Promise(res => {
    setTimeout(() => {
        res({
            ok: true,
            json: () => ({
                noticias: 'buenas noticias'
            })
        })
    }, 10000)
  })
  if (!res.ok) throw new Error(res.statusText)
  return res.json()
}

const Example = lazy(() => {
  const { data, error, isPending } = useAsync({ promiseFn: loadPlayer, playerId: 1 })
  if (isPending) return null
  if (data)
    return (
      <div>
        <strong>Mock data:</strong>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    )
  return null
})

export default Example