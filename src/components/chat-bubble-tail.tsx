import Svg, {
  Circle,
  Ellipse,
  G,
  Text,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';

import React from 'react';
import {View, StyleSheet} from 'react-native';

export default ({color='white', mirror=false}) => (
  <Svg width="100%" height="100%" viewBox="0 0 100 100">
    <Path
      origin="50, 50"
      x={mirror ? 20 : -20}
      rotation={mirror ? -90 : 90}
      stroke="none"
      fill={color}
      d="M42.169872981078 8.1987298107781a5 5 0 0 1 8.6602540378444 0l41.339745962156 71.602540378444a5 5 0 0 1 -4.3301270189222 7.5l-82.679491924311 0a5 5 0 0 1 -4.3301270189222 -7.5"
    />
  </Svg>
);
