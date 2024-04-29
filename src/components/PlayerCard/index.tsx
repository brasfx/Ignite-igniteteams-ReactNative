import { IconButton } from '@components/IconButton';
import { Container, Icon, Name } from './styles';

import { MaterialIcons } from '@expo/vector-icons';

type PlayerCardProps = {
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  onRemove: () => void;
};

export const PlayerCard = ({ icon, name, onRemove }: PlayerCardProps) => {
  return (
    <Container>
      <Icon name={icon} />
      <Name>{name}</Name>
      <IconButton type="SECONDARY" icon="close" onPress={onRemove} />
    </Container>
  );
};
