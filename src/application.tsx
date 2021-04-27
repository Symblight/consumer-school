import { hot } from 'react-hot-loader/root'
import { FC } from 'react'

import ImageAvif from 'assets/images/comparison.avif'
import ImageJPG from 'assets/images/comparison.jpeg'

import { GlobalStyle } from './global-style'

export const Application: FC = () => {
  return (
    <div>
      <GlobalStyle />
      <span>React</span>
      <picture>
        <source srcSet={ImageAvif} type="image/avif" />
        <img src={ImageJPG} alt="avif in frameworks" />
      </picture>
    </div>
  )
}

export default hot(Application)
