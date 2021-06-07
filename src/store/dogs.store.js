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
    })
  }

  async fetchDogsApi(name) {
    let resDogs = await ApiDogs(name);
    runInAction(() => {
      this.listDogs = resDogs.data.message;
    })
  }

  filterItems(name) {
    console.log(name, this.listItems)
    // tra ve 1 cai mang chua items theo name
    return this.listItems.filter(d => String(d).toLocaleLowerCase().includes(String(name).toLocaleLowerCase()));
  }


}

export default new DogsStore();