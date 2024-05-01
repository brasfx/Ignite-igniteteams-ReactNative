import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Container, Content, Icon } from './styles';
import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { createGroups } from '@storage/group/createGroups';

export const NewGroup = () => {
  const navigation = useNavigation();
  const [group, setGroup] = useState<string>('');

  const handleGoHome = () => {
    navigation.navigate('groups');
  };

  const handleCreateNewGroup = async () => {
    await createGroups(group);
    navigation.navigate('players', { group });
  };

  return (
    <Container>
      <Header showBackButton onPress={handleGoHome} />
      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="Crie uma turma para adicionar pessoas"
        />
        <Input placeholder="Nome da turma" onChangeText={setGroup} />
        <Button
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handleCreateNewGroup}
        />
      </Content>
    </Container>
  );
};
