let clientCounter = 0;
class Client {
  constructor(data) {
    this.id = data.id || clientCounter++;
    this.surname = data.surname;
    this.name = data.name;
    this.lastName = data.lastName;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.contacts = data.contacts;
  };

  get formatedDate() {
    const doubleDigit = (n) => (n > 9 ? n : `0${n}`);
    const date = new Date(this.createdAt);
    const formattedDate = `${doubleDigit(date.getDate())}.${doubleDigit(date.getMonth())}.${date.getFullYear()}`;
    const formattedTime = `${doubleDigit(date.getHours())}:${doubleDigit(date.getMinutes())}`;
    return {
      date: formattedDate,
      time: formattedTime,
    };
  }

  get formatingDate() {
    const doubleDigit = (n) => (n > 9 ? n : `0${n}`);
    const date = new Date(this.updatedAt);
    const formattedDate = `${doubleDigit(date.getDate())}.${doubleDigit(date.getMonth())}.${date.getFullYear()}`;
    const formattedTime = `${doubleDigit(date.getHours())}:${doubleDigit(date.getMinutes())}`;
    return {
      date: formattedDate,
      time: formattedTime,
    };
  }
};

class ClientManager {
  list = [];
  searchList = [];

  searchQuery = {
    surname: '',
  };

  addSearchList = (clientsList) => {
    this.searchList = clientsList.map((el) => new Client(el));
  }

  addClient(clientData) {
    this.list.push(new Client(clientData));
  }

  addClients = (clientData) => {
    this.list = clientData.map((el) => new Client(el));
  }

  removeClient(client) {
    const index = this.list.findIndex(item => item.id === client.id);
    if (index !== -1) {
      this.list.splice(index, 1);
    }
  }

  sortByDate(prop = 'createdAt') {
    this.list.sort(function (a, b) {
      const dateA = new Date(a[prop]);
      const dateB = new Date(b[prop]); 
         
      return dateA - dateB;
    });    
    return this.list;  
  }

  sortBy(prop = 'surname') {
    this.list.sort(function (a, b) {
      if (a[prop] < b[prop]) return -1;
    });
    return this.list;
  }
}

export const clientManager = new ClientManager();