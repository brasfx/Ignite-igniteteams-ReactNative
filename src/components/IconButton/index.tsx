import { TouchableOpacityProps } from 'react-native/types';
import { Container, Icon, IconButtonTypeStylesProps } from './styles';
import { MaterialIcons } from '@expo/vector-icons';

type IconButtonProps = TouchableOpacityProps & {
  type?: IconButtonTypeStylesProps;
  icon: keyof typeof MaterialIcons.glyphMap;
};

export const IconButton = ({
  icon,
  type = 'PRIMARY',
  ...rest
}: IconButtonProps) => {
  return (
    <Container {...rest}>
      <Icon type={type} name={icon} />
    </Container>
  );
};
