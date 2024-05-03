import React, { useEffect, useState, useRef } from 'react';
import { Alert, FlatList, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Container, Form, HeaderList, PlayersCounter } from './styles';

import { Highlight } from '@components/Highlight';
import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { IconButton } from '@components/IconButton';
import { Input } from '@components/Input';
import { Filter } from '@components/Filter';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { addPlayerByGroup } from '@storage/player/addPlayerByGroup';
import { AppError } from '@utils/AppError';
import { getPlayersByGroupAndTeam } from '@storage/player/getPlayersByGroupAndTeam';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { removePlayerByGroup } from '@storage/player/removePlayerByGroup';
import { removeGroup } from '@storage/group/removeGroup';
import { Loading } from '@components/Loading';

type RouteParams = {
  group: string;
};

export const Players = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { group } = route.params as RouteParams;
  const playerInputRef = useRef<TextInput>(null);

  const [team, setTeam] = useState<string>('');
  const [teams, setTeams] = useState<string[]>(['Time 1', 'Time 2']);
  const [selectedTeam, setSelectedTeam] = useState<string>(teams[0]);
  const [player, setPlayer] = useState<string>('');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleGoHome = () => {
    navigation.navigate('groups');
  };

  const getPlayersByTeam = async () => {
    try {
      setIsLoading(true);
      const playersByTeam = await getPlayersByGroupAndTeam(group, selectedTeam);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Jogadores',
        'Não foi possível listar os jogadores desse time',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPlayers = async () => {
    if (player.trim().length === 0) {
      return Alert.alert(
        'Novo jogador',
        'Informe o nome do jogador para adicionar',
      );
    }
    try {
      await addPlayerByGroup({ name: player, team: selectedTeam }, group);
      playerInputRef.current?.blur();
      getPlayersByTeam();
      setPlayer('');
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo jogador', error.message);
      } else {
        Alert.alert(
          'Novo jogador',
          'Não foi possível adicionar um novo jogador.',
        );
      }
    }
  };

  const handleRemovePlayers = async (name: string) => {
    try {
      await removePlayerByGroup(name, group);
      getPlayersByTeam();
    } catch (error) {
      Alert.alert('Remover jogador', 'Não foi possível remover o jogador.');
    }
  };

  const deleteGroup = async () => {
    try {
      await removeGroup(group);
      handleGoHome();
    } catch (error) {
      console.log(error);
      Alert.alert('Deletar turma', 'Não foi possível deletar a turma.');
    }
  };

  const handleRemoveGroup = () => {
    Alert.alert('Apagar turma', 'Deseja realmente apagar essa turma ?', [
      { text: 'Não', style: 'cancel' },
      {
        text: 'Sim',
        onPress: () => {
          deleteGroup();
        },
      },
    ]);
  };

  useEffect(() => {
    getPlayersByTeam();
  }, [selectedTeam]);

  return (
    <Container>
      <Header showBackButton onPress={handleGoHome} />
      <Highlight title={group} subtitle="Adicione a galera e separe os times" />
      <Form>
        <Input
          inputRef={playerInputRef}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          value={player}
          onChangeText={setPlayer}
          onSubmitEditing={handleAddPlayers}
          returnKeyType="done"
        />
        <IconButton icon="add" onPress={handleAddPlayers} />
      </Form>
      <HeaderList>
        <FlatList
          keyExtractor={(item) => item}
          data={teams}
          renderItem={({ item }) => (
            <Filter
              key={item}
              title={item}
              isActive={item === selectedTeam}
              onPress={() => setSelectedTeam(item)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <PlayersCounter>{players?.length}</PlayersCounter>
      </HeaderList>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          keyExtractor={(item) => item.name}
          data={players}
          renderItem={({ item }) => (
            <PlayerCard
              key={item.name}
              name={item.name}
              icon="person"
              onRemove={() => handleRemovePlayers(item.name)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players?.length === 0 && { flex: 1 },
          ]}
          ListEmptyComponent={<ListEmpty message="Não há pessoas nesse time" />}
        />
      )}

      <Button
        title="Remover turma"
        type="SECONDARY"
        onPress={handleRemoveGroup}
      />
    </Container>
  );
};
