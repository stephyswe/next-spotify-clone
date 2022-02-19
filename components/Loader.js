import { useState } from 'react'
import { css } from '@emotion/react'
import ClipLoader from 'react-spinners/ClipLoader'

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`

export default function Loader() {
  let [color, setColor] = useState('#ffffff')
  return <ClipLoader color={color} loading={true} css={override} size={150} />
}
