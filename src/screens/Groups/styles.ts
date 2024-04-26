import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  padding: 24px;
  align-items: center;
  //justify-content: center;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.RED_DARK};
  font-size: 23px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;
