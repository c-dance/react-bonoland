// const Map = ({ geolocation, moveLocation }) => {
//     return (
//         <form>
//             <input type="texts" onChange={event => moveLocation(event)} />
//             <span>{ geolocation }</span>
//             <button>시도 입력</button>
//         </form>
//     )
// }

import { MAP } from './MapStyle';
import React from "react";

const Map = ({ region }) => (
        <MAP id="map"/>
);

export default Map;