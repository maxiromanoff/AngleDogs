import { action, runInAction, makeAutoObservable } from 'mobx';
import { ApiList, ApiDogs } from '../action/Api';
import { formatList } from '../utils';

class DogsStore {
  listItems = [];
  listDogs = [];

  constructor() {
    makeAutoObservable(this, {
      fetchListItemApi: action.bound,
      fetchDogsApi: action.bound,
      filterItems: action.bound,
    });
  }

  async fetchListItemApi() {
    let resList = await ApiList();
    runInAction(() => {
      this.listItems = formatList(resList.data);
    });
  }

  async fetchDogsApi(name) {
    if (name === null) {
      this.listDogs = [];
    } else {
      let resDogs = await ApiDogs(name);
      runInAction(() => {
        this.listDogs = resDogs.data.message;
      });
    }
  }

  filterItems(name) {
    return this.listItems.filter(d =>
      String(d).toLocaleLowerCase().includes(String(name).toLocaleLowerCase()),
    );
  }
}

export default new DogsStore();