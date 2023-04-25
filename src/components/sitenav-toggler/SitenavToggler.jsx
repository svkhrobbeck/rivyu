import "./SitenavToggler.scss";

export default function SitenavToggler({ handleSitenavToggle }) {
  return (
    <button className="sitenav-toggler" onClick={handleSitenavToggle}>
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth={0}
        viewBox="0 0 24 24"
        fontSize="25px"
        cursor="pointer"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M3 4h18v2H3V4zm0 7h12v2H3v-2zm0 7h18v2H3v-2z" />
        </g>
      </svg>
    </button>
  );
}
