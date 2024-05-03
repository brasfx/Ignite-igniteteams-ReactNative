import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Container, Content, Icon } from './styles';
import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { createGroups } from '@storage/group/createGroups';
import { AppError } from '@utils/AppError';

export const NewGroup = () => {
  const navigation = useNavigation();
  const [group, setGroup] = useState<string>('');

  const handleGoHome = () => {
    navigation.navigate('groups');
  };

  const handleCreateNewGroup = async () => {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('Novo grupo', 'Informa o nome do grupo.');
      }
      await createGroups(group);
      navigation.navigate('players', { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo grupo', error.message);
      } else {
        Alert.alert('Novo grupo', 'Não foi possivel criar um novo grupo.');
        console.log(error);
      }
    }
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
