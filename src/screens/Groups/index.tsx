import { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Container } from './styles';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { FlatList } from 'react-native';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { getAllGroups } from '@storage/group/getAllGroups';

export const Groups = () => {
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  const handleNewGroup = () => {
    navigation.navigate('new');
  };

  const handleGetAllGroups = async () => {
    try {
      const allGroups = await getAllGroups();
      setGroups(allGroups);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleGetAllGroups();
    }, []),
  );

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com sua turma" />
      <FlatList
        keyExtractor={(item) => item}
        data={groups}
        renderItem={({ item }) => <GroupCard title={item} />}
        contentContainerStyle={groups?.length === 0 && { flex: 1 }}
        ListEmptyComponent={
          <ListEmpty message="Que tal cadastrar a primeira turma ?" />
        }
      />
      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
};
