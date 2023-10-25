import { ReactSVG } from "react-svg";

function SVGIcon({ svg, className }){
    return ( 
      <ReactSVG 
        src={`data:image/svg+xml;utf8,${svg}`} 
        className={className}
      />
    )
}

export default SVGIcon