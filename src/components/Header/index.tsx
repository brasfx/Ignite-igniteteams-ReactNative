import { BackIcon, Container, Logo, BackButton } from './styles';

import logo from '@assets/logo.png';

type HeaderProps = {
  showBackButton?: boolean;
  onPress?: () => void;
};

export const Header = ({ showBackButton = false, onPress }: HeaderProps) => {
  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={onPress}>
          <BackIcon />
        </BackButton>
      )}
      <Logo source={logo} />
    </Container>
  );
};
