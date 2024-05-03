import { useState, useCallback } from 'react';
import { Alert, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Container } from './styles';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { Loading } from '@components/Loading';

import { getAllGroups } from '@storage/group/getAllGroups';

export const Groups = () => {
  const [groups, setGroups] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigation = useNavigation();

  const handleNewGroup = () => {
    navigation.navigate('new');
  };

  const handleGetAllGroups = async () => {
    try {
      setIsLoading(true);
      const allGroups = await getAllGroups();
      setGroups(allGroups);
    } catch (error) {
      console.error(error);
      Alert.alert('Turmas', 'Houve um erro ao listar as turmas');
    } finally {
      setIsLoading(false);
    }
  };

  const openGroup = (group: string) => {
    navigation.navigate('players', { group });
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
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          keyExtractor={(item) => item}
          data={groups}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => openGroup(item)} />
          )}
          contentContainerStyle={groups?.length === 0 && { flex: 1 }}
          ListEmptyComponent={
            <ListEmpty message="Que tal cadastrar a primeira turma ?" />
          }
        />
      )}
      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
};
