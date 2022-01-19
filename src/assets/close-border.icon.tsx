import * as React from 'react';
import Svg, { Defs, G, Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: style */

interface Props {
  size?: number;
}

const CloseBorderIcon: React.FC<Props> = ({ size }) => {
  return (
    <Svg width={size ? size : 16.817} height={size ? size : 17.169} viewBox="0 0 16.817 17.169">
      <Defs />
      <G id="prefix__Group_9015" transform="translate(2028 -602.598)">
        <G id="prefix__Group_8726" transform="translate(-2028 602.598)">
          <G id="prefix__Group_8725">
            <Path
              id="prefix__Path_9886"
              d="M13.814 17.169H3A3.039 3.039 0 010 14.1V3.066A3.039 3.039 0 013 0h10.814a3.039 3.039 0 013 3.066V14.1a3.039 3.039 0 01-3 3.069zm1.8-14.1a1.821 1.821 0 00-1.8-1.84H3a1.821 1.821 0 00-1.8 1.84V14.1A1.821 1.821 0 003 15.943h10.814a1.821 1.821 0 001.8-1.84z"
              fill="#fff"
            />
          </G>
        </G>
        <G id="prefix__Group_8728" transform="rotate(45 -1741.316 -2134.782)">
          <G id="prefix__Group_8727">
            <Path
              id="prefix__Path_9887"
              d="M6.607 4.292H4.2v2.453a.6.6 0 11-1.2 0V4.292H.6a.613.613 0 010-1.226H3V.613a.6.6 0 111.2 0v2.453h2.4a.613.613 0 010 1.226z"
              fill="#fff"
            />
          </G>
        </G>
      </G>
    </Svg>
  );
};

export { CloseBorderIcon };
