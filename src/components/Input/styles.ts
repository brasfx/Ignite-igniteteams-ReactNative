import { TextInput } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Container = styled(TextInput)`
  flex: 1;
  min-height: 56px;
  max-height: 56px;
  border-radius: 6px;
  padding: 16px;
  ${({ theme }) => css`
    background-color: ${theme.COLORS.GRAY_700};
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
`;

export const Message = styled.Text`
  text-align: center;
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.SM}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    color: ${theme.COLORS.GRAY_300};
  `}
`;
