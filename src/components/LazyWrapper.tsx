import React, { FC, lazy, Suspense } from 'react'

interface LazyWrapperProps {
    path: string
}

const LazyWrapper: FC<LazyWrapperProps> = ({ path }) => {
    const LazyComponent = lazy(() => import(`@/components/${path}`))

    return (
        <Suspense fallback={<div>loading...</div>}>
            <LazyComponent></LazyComponent>
        </Suspense>
    )
}

export default LazyWrapper
