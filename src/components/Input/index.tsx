import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';

import { Container } from './styles';

type InputProps = TextInputProps & {
  placeholder: string;
  inputRef?: React.RefObject<TextInput>;
};

export const Input = ({ placeholder, inputRef, ...rest }: InputProps) => {
  const { COLORS } = useTheme();
  return (
    <Container
      ref={inputRef}
      placeholder={placeholder}
      placeholderTextColor={COLORS.GRAY_300}
      cursorColor={COLORS.WHITE}
      {...rest}
    />
  );
};
