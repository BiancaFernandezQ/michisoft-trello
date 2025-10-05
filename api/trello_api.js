import * as dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.TRELLO_KEY;
const TOKEN = process.env.TRELLO_TOKEN;
const MEMBER_ID = process.env.TRELLO_MEMBER_ID;

export class TrelloAPI {
  constructor(requestInstance) {
    this.request = requestInstance;
  }
  
  async createBoard(name, prefs = { permissionLevel: 'private' }) {
    const response = await this.request.post(
      'https://api.trello.com/1/boards/',
      {
        params: {
          name,
          defaultLabels: true,
          defaultLists: false,
          keepFromSource: 'none',
          prefs_permissionLevel: prefs.permissionLevel,
          key: API_KEY,
          token: TOKEN,
        },
      }
    );
    return response;
  }

  async getBoards() {
    const response = await this.request.get(
      `https://api.trello.com/1/members/${MEMBER_ID}/boards`,
      {
        params: { key: API_KEY, token: TOKEN },
      }
    );
    return response;
  }

  async getBoardById(boardId) {
    const response = await this.request.get(
      `https://api.trello.com/1/boards/${boardId}`,
      { params: { key: API_KEY, token: TOKEN } }
    );
    return response;
  }

  async getCardByName(boardId, nameCard){
    const response = await this.request.get(
  `https://api.trello.com/1/boards/${boardId}/cards`,
  { params: { key: API_KEY, token: TOKEN } }
  );
  const cards = await response.json();
  const cardId = cards.find(c => c.name == nameCard)?.id;
  return cardId;
  }

  async updateCardDescription(cardId, newDescription) {
  const response = await this.request.put(
    `https://api.trello.com/1/cards/${cardId}`,
    {
      params: {
        key: API_KEY,
        token: TOKEN,
        desc: newDescription
      }
    }
  );
  return response;
}

}
