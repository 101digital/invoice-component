import * as React from 'react';
import Svg, { Defs, G, Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: style */

interface Props {
  size?: number;
  color?: string;
}

const SettingsIcon: React.FC<Props> = ({ size, color = '#5d21d2' }) => {
  return (
    <Svg width={size ? size : 13.65} height={size ? size : 11.55} viewBox="0 0 13.65 11.55">
      <Defs />
      <G id="prefix__filter" transform="translate(-3 -5)">
        <Path
          id="prefix__Path_7803"
          d="M16.125 6.05h-7.35A1.051 1.051 0 007.725 5h-1.05a1.051 1.051 0 00-1.05 1.05h-2.1a.525.525 0 100 1.05h2.1a1.051 1.051 0 001.05 1.05h1.05a1.051 1.051 0 001.05-1.05h7.35a.525.525 0 000-1.05zM6.675 7.1V6.05h1.05V7.1z"
          fill={color}
        />
        <Path
          id="prefix__Path_7804"
          d="M16.125 14.05h-3.15a1.051 1.051 0 00-1.05-1.05h-1.05a1.051 1.051 0 00-1.05 1.05h-6.3a.525.525 0 100 1.05h6.3a1.051 1.051 0 001.05 1.05h1.05a1.051 1.051 0 001.05-1.05h3.15a.525.525 0 000-1.05zm-5.25 1.05v-1.05h1.05v1.05z"
          fill={color}
          transform="translate(0 -3.8)"
        />
        <Path
          id="prefix__Path_7805"
          d="M16.125 22.05h-7.35A1.051 1.051 0 007.725 21h-1.05a1.051 1.051 0 00-1.05 1.05h-2.1a.525.525 0 000 1.05h2.1a1.051 1.051 0 001.05 1.05h1.05a1.051 1.051 0 001.05-1.05h7.35a.525.525 0 000-1.05zm-9.45 1.05v-1.05h1.05v1.05z"
          fill={color}
          transform="translate(0 -7.6)"
        />
      </G>
    </Svg>
  );
};

export { SettingsIcon };
