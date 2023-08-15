import * as React from "react"
import './Icon.css'
const DownvoteIcon = ({props,color}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="downvote-icon"
    width="2em"
    height="2em"
    fill={color}
    viewBox="0 -960 960 960"
    {...props}
  >
    <path d="M450-800v526L202-522l-42 42 320 320 320-320-42-42-248 248v-526h-60Z"/>
  </svg>
)
export default DownvoteIcon;