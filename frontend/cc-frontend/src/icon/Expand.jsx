import * as React from "react"
import './Icon.css'
const Expand = ({ props, color }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        width="1em"
        className="expand-icon"
        viewBox="0 -960 960 960"
        {...props}
    >
        <path d="M480-345 240-585l43-43 197 198 197-197 43 43-240 239Z" />
    </svg>
)
export default Expand;
