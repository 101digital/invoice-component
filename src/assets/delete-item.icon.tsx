import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

interface Props {
  size?: number;
}

const DeleteItemIcon: React.FC<Props> = ({ size }) => {
  return (
    <Svg width={size ? size : 17.447} height={size ? size : 17.812} viewBox="0 0 17.447 17.812">
      <G data-name="Group 8726">
        <G data-name="Group 8725">
          <Path
            data-name="Path 9886"
            d="M14.332 17.812H3.116A3.152 3.152 0 010 14.632V3.181A3.152 3.152 0 013.116 0h11.216a3.152 3.152 0 013.116 3.181v11.451a3.152 3.152 0 01-3.116 3.18zM16.2 3.181a1.889 1.889 0 00-1.869-1.908H3.116a1.889 1.889 0 00-1.87 1.908v11.451a1.889 1.889 0 001.87 1.908h11.216a1.889 1.889 0 001.868-1.908z"
            fill="#c35376"
          />
        </G>
      </G>
      <G data-name="Group 8728">
        <G data-name="Group 8727">
          <Path
            data-name="Path 9887"
            d="M10.477 11.56L8.715 9.796l-1.801 1.801a.623.623 0 11-.881-.88l1.8-1.802-1.762-1.763a.636.636 0 01.9-.9l1.762 1.764 1.8-1.8a.623.623 0 11.88.881l-1.799 1.8 1.762 1.762a.636.636 0 01-.9.9z"
            fill="#c35376"
          />
        </G>
      </G>
    </Svg>
  );
};

export { DeleteItemIcon };
