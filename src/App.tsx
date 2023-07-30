import React, { Suspense, useState } from 'react'
import './App.css'

import lessStyles from '@/app.less'
import scssStyles from '@/app.scss'
import stylStyles from '@/app.styl'

import smallImg from '@/assets/imgs/5kb_img.jpeg'
import bigImg from '@/assets/imgs/10kb_img.png'

// import list from './test.json'
import ClassComp from './components/Class'

import { add } from './utils/watch'
import LazyWrapper from '@/components//LazyWrapper'

// const LazyDemo = lazy(() => import('@/components/LazyDemo'))

function App() {
    const [show, setShow] = useState(false)
    const [count, setCounts] = useState('')

    const onChange = (e: any) => {
        setCounts(e.target.value)
    }

    // 点击事件中动态引入css, 设置show为true
    const handleOnClick = () => {
        import('@/App.css')
        setShow(true)
    }

    return (
        <div>
            <h2>webpack5-react-ts</h2>
            <div className={lessStyles.lessBox}>
                <div className={lessStyles.box}>
                    lessBox（east_white）
                    <img src={smallImg} alt='小于10kb的图片' />
                    <img src={bigImg} alt='大于于10kb的图片' />
                    <div className={lessStyles.smallImg}>小图片背景</div>
                    <div className={lessStyles.bigImg}>大图片背景</div>
                </div>
            </div>
            <div className={scssStyles.scssBox}>
                <div className={scssStyles.box}>scssBox</div>
            </div>
            <div className={stylStyles.stylBox}>
                <div className={stylStyles.box}>stylBox</div>
            </div>
            <ClassComp />
            <div>
                <p>受控组件</p>
                <input type='text' value={count} onChange={onChange} />
                <br />
                <p>非受控组件</p>
                <input type='text' />
            </div>
            <div>{add(1, 2)}</div>
            <>
                <h2 onClick={handleOnClick}>展示</h2>
                {/* show为true时加载LazyDemo组件 */}
                {show && (
                    <Suspense fallback={null}>
                        <LazyWrapper path='LazyDemo' />
                    </Suspense>
                )}
            </>
        </div>
    )
}

export default App
