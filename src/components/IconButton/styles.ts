import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

export type IconButtonTypeStylesProps = 'PRIMARY' | 'SECONDARY';

type IconButtonProps = {
  type: IconButtonTypeStylesProps;
};

export const Container = styled(TouchableOpacity)`
  width: 56px;
  height: 56px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
`;

export const Icon = styled(MaterialIcons).attrs<IconButtonProps>(
  ({ theme, type, name }) => ({
    name,
    size: 24,
    color: type === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK,
  }),
)``;
