import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppError } from '@utils/AppError';
import { PLAYER_COLLECTION } from '@storage/storageConfig';
import { PlayerStorageDTO } from './PlayerStorageDTO';
import { getPlayersByGroup } from './getPlayersByGroup';

export const addPlayerByGroup = async (
  newPlayer: PlayerStorageDTO,
  group: string,
) => {
  try {
    const storedPlayers = await getPlayersByGroup(group);

    const playerAlreadyAdded = storedPlayers.filter(
      (player) => player.name === newPlayer.name,
    );

    if (playerAlreadyAdded.length > 0) {
      throw new AppError('Já existe um jogador adicionado com esse nome');
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer]);
    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch (error) {
    throw error;
  }
};
