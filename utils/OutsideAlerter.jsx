import { useRef } from 'react'
import useOutsideAlerter from '../hooks/useOutsideAlerter'

export default function OutsideAlerter ({ callback, ...props }) {
  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef, callback)

  return <div ref={wrapperRef}>{props.children}</div>
}
