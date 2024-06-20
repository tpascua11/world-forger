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
    },
    templateInfoType:  [
      'string', 'number', 'boolean', 'current_and_max',
      'script_list', 'resource', 'table', 'table_list',
      'image_url'
    ],
    entityItemIsEdited: {},
    entityItem: {},
    entityTemplate: {},
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
      //TODO: THIS DOES NOTHING!
      console.log("IS THIS USED ANYWHERE ELSE!!!");

      console.log("IS THIS USED ANYWHERE ELSE!!!");
      console.log("IS THIS USED ANYWHERE ELSE!!!");
      console.log("IS THIS USED ANYWHERE ELSE!!!");
      console.log("IS THIS USED ANYWHERE ELSE!!!");
      if(!this.getEntityData(name)) return 0;
      this.world.Entity[name].list;

      let nextKey = Object.keys(this.world['Entity'][name].list).length;
      this.world['Entity'][name].list[nextKey] = this.defaultEntity(name);
      console.log("CHECK SUPER", this.world['Entity'][name].list);
    },
    defaultEntity(name){
      //TODO: THIS DOES NOTHING!
      console.log("KKKK", name);
      let templateInfo = this.getEntityTemplateInfo(name);

      let newObject = {};
      for (let key in templateInfo) {
        if(templateInfo[key].type === 'number'){
          newObject[key] = 0;
        }
        else if(templateInfo[key].type === 'current_and_max'){
          newObject[key] = {current: 10, max: 100};
        }
        else if(templateInfo[key].type === 'boolean'){
          newObject[key] = false;
        }
        else if(templateInfo[key].type === 'image_url'){
          newObject[key] = '';
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

      this.refreshEntityAttributeList(entityName);
    },
    deleteEntityTemplateInfoProperty(entityName, deletedProp){
      let referenceEntity = this.getEntityTemplateInfo(entityName);
      let name = deletedProp;

      console.log("NAME!?", name);
      if(name === 'name'){
        window.alert("Name is defaulted and fixed");
        return false;
      }
      if (!confirm(`Removing property '${name}'. Do you wish to continue?`)) return false;

      if (referenceEntity && typeof referenceEntity === 'object') {
        if (name in referenceEntity) {
          delete this.world['Entity'][entityName].templateInfo[deletedProp];
          console.log(`Attribute '${name}' removed successfully.`);
        } else {
          console.log(`Attribute '${name}' does not exist in the object.`);
        }
      } else {
        console.log("Invalid reference entity or reference entity is not an object.");
      }

      this.refreshEntityAttributeList(entityName);
    },
    refreshEntityAttributeList(entityName){
      let entityList = this.getEntityList(entityName);
      console.log("WHAT IS ENTITY NAME", entityName);
      console.log("1. REFERSH!", entityList);


			for (let key1 in entityList){
        //let item = this.world['Entity'][this.selectedEntityName].list[key1];
        //let templateInfo = this.world['Entity'][this.selectedEntityName].templateInfo;
        //
        console.log("KEY", key1);
        let item = this.getEntityListItem(entityName, key1);
        logger.scanObject(item);
        let templateInfo = this.getEntityTemplateInfo(entityName);
        console.log("? here?");
        let newItem = {};
        key1; item; newItem;
        //console.log("Check", item, templateInfo, newItem);


				for(let prop in templateInfo){
					//Default the numbers if not exist
          if (item[prop] === undefined) {
            //templateInfo[prop].type;
            //newItem[prop] = this.defaultEntity(prop);
            //newItem[prop] = this.defaultEntity(entityName);
            /*
						if(templateInfo[prop].type === 'number'){
							newItem[prop] = 999;
						}
						else {
							newItem[prop] = 'flowers';
            }
            */
            newItem[prop] = this.entityItemMatch(templateInfo[prop].type);
					}
					else {
						newItem[prop] = item[prop];
					}

          this.world['Entity'][entityName].list[key1] = newItem;
				}

      }
      //this.$root.world = this.world;
      //this.$root.entityItem[this.selectedEntityName] = {};

    },

    entityItemMatch(prop){
      if(prop === 'number') return 777;
      else if(prop === 'string') return 'flowers'
      else if (prop === 'current_and_max') return {current: 0, max: 100}
      else return '';
    },

    clearEntityItemIsEdited(entityName){
			if(!this.entityItemIsEdited[entityName]){
				this.entityItemIsEdited[entityName] = {};
			}
    },
    saveEntityHistory(entityName){
      //If No MAIN Saved Reference make a new one
      if(!this.entityItem[entityName]){
        this.entityItem[entityName] = {};
      }
    },
    saveEntityItemHistory(entityName, itemKey, copyItem){
      //entityName; itemKey;
      this.world['Entity'][entityName][itemKey] = copyItem;
    },
    resetEntityItemHistory(entityName, itemKey){
      this.world['Entity'][entityName][itemKey] = null;
    },

    saveEntityTemplateHistory(entityName){
      entityName;
    },
    resetEntityHistory(entityName){
      this.entityTemplate[entityName] = {};
      this.entityItem[entityName] = {};
    },
    setEntityTemplate(entityName, newTemplate){
      this.entityTemplate[entityName] = newTemplate;
    }
  },
  getters: {
    getWorld: (state) => {
      return state.world;
    },
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

    getEntityTemplate: (state) => {
      return state.entityTemplate;
    },
    getEntityItemEdited: (state) => {
      return state.entityItemIsEdited;
    },
    getEntityEdits: (state) => (entityName, entityItemKey) => {
      let replaceEntityItem = {};

      if(state.entityItem[entityName][entityItemKey]){
        replaceEntityItem =
          state.entityItem[entityName][entityItemKey];
      }
      else{
        state.entityItem[entityName][entityItemKey] =
          replaceEntityItem =
          JSON.parse(JSON.stringify(
            state.getEntityListItem(entityName, entityItemKey)
          ));
      }

      return replaceEntityItem;
    },
    checkEntityTemplateInfoExist(entityName, attribute){
      attribute;
      if(    (this.getEntityData(entityName))
          && (this.state.world.Entity[entityName].templateInfo[attribute])
      ){
        return true;
      }
      else return false;
    }
  }
});

