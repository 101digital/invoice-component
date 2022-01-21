import * as React from 'react';
import Svg, { Defs, G, Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const EditIcon: React.FC<Props> = ({ size, color }) => {
  return (
    <Svg
      id="prefix__edit"
      width={size ? size : 13.207}
      height={size ? size : 13.207}
      viewBox="0 0 13.207 13.207"
    >
      <Defs />
      <G id="prefix__Group_7889">
        <G id="prefix__Group_7888">
          <Path
            id="prefix__Path_7836"
            d="M0 76.013v2.752h2.752l8.119-8.12-2.752-2.752z"
            fill={color ? color : '#646876'}
            transform="translate(0 -65.558)"
          />
          <Path
            id="prefix__Path_7837"
            d="M262.761 1.928L261.047.215a.735.735 0 00-1.038 0l-1.343 1.343 2.752 2.752 1.343-1.343a.735.735 0 000-1.039z"
            fill={color ? color : '#646876'}
            transform="translate(-249.769)"
          />
        </G>
      </G>
    </Svg>
  );
};

export { EditIcon };
