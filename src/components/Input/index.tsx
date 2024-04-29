import { TextInputProps } from 'react-native';

import { Container } from './styles';
import { useTheme } from 'styled-components/native';

type InputProps = TextInputProps & {
  placeholder: string;
};

export const Input = ({ placeholder, ...rest }: InputProps) => {
  const { COLORS } = useTheme();
  return (
    <Container
      placeholder={placeholder}
      placeholderTextColor={COLORS.GRAY_300}
      cursorColor={COLORS.WHITE}
      {...rest}
    />
  );
};
