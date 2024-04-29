import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  padding: 24px;
  //align-items: center;
  //justify-content: center;
`;

export const Title = styled.Text`
  font-size: 23px;
  ${({ theme }) => css`
    color: ${theme.COLORS.RED_DARK};
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
`;
