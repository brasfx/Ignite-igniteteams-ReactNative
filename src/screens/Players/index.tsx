import React, { useState } from 'react';
import { FlatList } from 'react-native';
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

type RouteParams = {
  group: string;
};

export const Players = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params as RouteParams;
  const [team, setTeam] = useState<string>('');
  const [teams, setTeams] = useState<string[]>(['Time 1', 'Time 2', 'Time 3']);
  const [selectedTeam, setSelectedTeam] = useState<string>(teams[0]);
  const [player, setPlayer] = useState<string>('');
  const [players, setPlayers] = useState<string[]>([]);

  const handleAddPlayers = () => {
    if (player.trim().length > 0 && !players.includes(player)) {
      setPlayers((prev) => [...prev, player]);
      setPlayer('');
    }
  };

  const handleRemovePlayers = (name: string) => {
    const playersRemoved = players.filter((player) => player !== name);
    setPlayers(playersRemoved);
  };

  const handleCreateTeam = () => {
    if (team.trim().length > 0 && !teams.includes(team)) {
      setTeams((prev) => [...prev, team]);
      setTeam('');
    }
  };

  const handleRemoveTeam = (name: string) => {
    const removedTeam = teams.filter((team) => team !== name);
    setTeams(removedTeam);
  };

  const handleGoHome = () => {
    navigation.navigate('groups');
  };

  return (
    <Container>
      <Header showBackButton onPress={handleGoHome} />
      <Highlight title={group} subtitle="Adicione a galera e separe os times" />
      <Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
          value={player}
          onChangeText={setPlayer}
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
      <FlatList
        keyExtractor={(item) => item}
        data={players}
        renderItem={({ item }) => (
          <PlayerCard
            key={item}
            name={item}
            icon="person"
            onRemove={() => handleRemovePlayers(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players?.length === 0 && { flex: 1 },
        ]}
        ListEmptyComponent={<ListEmpty message="Não há pessoas nesse time" />}
      />

      <Button
        title="Remover turma"
        type="SECONDARY"
        onPress={() => handleRemoveTeam(team)}
      />
    </Container>
  );
};
