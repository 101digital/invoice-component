import * as React from 'react';
import Svg, { Defs, G, Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: style */

interface Props {
  size?: number;
  color?: string;
}

const AddItemIcon: React.FC<Props> = ({ size, color = '#5d21d2' }) => {
  return (
    <Svg
      id="prefix__plus"
      width={size ? size : 12.737}
      height={size ? size : 13.004}
      viewBox="0 0 12.737 13.004"
    >
      <Defs />
      <G id="prefix__Group_8726">
        <G id="prefix__Group_8725">
          <Path
            id="prefix__Path_9886"
            d="M10.463 13H2.275A2.3 2.3 0 010 10.682v-8.36A2.3 2.3 0 012.275 0h8.188a2.3 2.3 0 012.275 2.322v8.36A2.3 2.3 0 0110.463 13zm1.365-10.678A1.379 1.379 0 0010.463.929H2.275A1.379 1.379 0 00.91 2.322v8.36a1.379 1.379 0 001.365 1.393h8.188a1.379 1.379 0 001.365-1.393z"
            fill={color}
          />
        </G>
      </G>
      <G id="prefix__Group_8728" transform="translate(3.639 3.715)">
        <G id="prefix__Group_8727">
          <Path
            id="prefix__Path_9887"
            d="M141.537 139.784h-1.82v1.858a.455.455 0 11-.91 0v-1.858h-1.82a.465.465 0 010-.929h1.82V137a.455.455 0 11.91 0v1.858h1.82a.465.465 0 010 .929z"
            fill={color}
            transform="translate(-136.533 -136.533)"
          />
        </G>
      </G>
    </Svg>
  );
};

export { AddItemIcon };
