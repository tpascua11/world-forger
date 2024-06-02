import { defineStore } from 'pinia';
import logger from '@/service/logger';

export const useWorldStore = defineStore('world', {
  state: () => ({
    world: {
      'Entity': {
        Items: {
          templateInfo: {
            name: { type: 'string', important: true },
            cost: { type: 'number' },
            description: { type: 'string' },
          },
          templateOrder: [],
          rules: {},
          list: {
            0: { name: 'Milk', cost: 5, description: 'Fresh 2 weeks' },
            1: { name: 'Juice', cost: 5, description: 'Cold' },
            2: { name: 'Corn', cost: 2, description: 'On sale' },
            3: { name: 'Apple', cost: 1, description: 'On sale' },
            4: { name: 'Orange', cost: 1, description: 'On sale' },
            5: { name: 'Steak', cost: 10, description: 'Fresh cut' },
            6: { name: 'Pork', cost: 12, description: 'Fresh cut' },
          },
          description: '',
        },
        Store: {
          templateInfo: {
            name: { type: 'string', important: true },
            'x-cord': { type: 'number' },
            'y-cord': { type: 'number' },
            description: { type: 'string' },
          },
          templateOrder: [],
          rules: {},
          list: {
            0: { name: 'Average Store', 'x-cord': 10, 'y-cord': 10, description: 'Basic store stuff' }
          },
          description: '',
        }
      }
    }
  }),
  actions: {
    addNewEntity(name) {
      if(this.world.Entity[name]) return;
        this.world.Entity[name] = {
          templateInfo: {},
          templateOrder: [],
          rules: {},
          list: {},
          description: ''
        };
      console.log("Test", this.world.Entity);
      logger.scanObjectKeys(this.world.Entity);
    },
    addToEntityList(name){
      if(!this.getEntityData(name)) return 0;
      this.world.Entity[name].list;

      let nextKey = Object.keys(this.world['Entity'][name].list).length;
      this.world['Entity'][name].list[nextKey] = this.defaultEntity(name);
    },
    defaultEntity(name){
      let templateInfo = this.getEntityTemplateInfo(name);

      let newObject = {};
      for (let key in templateInfo) {
        if(templateInfo[key].type === 'number'){
          newObject[key] = 9999;
        }
        else{
          newObject[key]= '';
        }
      }
      return newObject;
    },
    editEntityListItem(entityName, itemKey, edits){
      console.log("Entity Name", entityName);
      console.log("Entity Key", itemKey);

      let obj1 = this.world.Entity[entityName].list[itemKey];
      let obj2 = edits;
      console.log("OBJ1 ", obj1);

      for (let key in this.getEntityTemplateInfo(entityName)) {
        obj1[key] = obj2[key];
      }
    },
    editEntityTemplateInfo(entityName, edits){
      let template = edits;
      let referenceEntity = this.getEntityTemplateInfo(entityName);

      for (let key in template) {
        referenceEntity[key] = template[key];
      }
    }
  },
  getters: {
    getEntityTypes: (state) => {
			return Object.keys(state.world['Entity']);
    },
    getEntityData: (state) => (entityType) => {
      return state.world.Entity[entityType];
    },
    getEntityList: (state) => (entityType) => {
      return state.world.Entity?.[entityType]?.list || [];
    },
    getEntityListKeys: (state) => (entityType) => {
      if(state.world.Entity?.[entityType]?.list){
        return Object.keys(state.world.Entity[entityType].list);
      }
      return [];
    },
    getEntityListItem: (state) => (entityType, itemKey) => {
      return state.world.Entity[entityType].list[itemKey];
    },
    getEntityTemplateInfo: (state) => (entityType) => {
      return state.world.Entity[entityType].templateInfo;
    },
  }
});

