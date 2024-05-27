import { createStore } from 'vuex'

export default createStore({
  state: {
      world: {
				'Entity': {
					'Items': {
            templateInfo: {
              'name': {
                type: 'string',
                important: true
              },
              'cost': {
                type: 'number',
              },
              'description': {
                type: 'string',
              },
            },
            templateOrder: [],
            rules: {},
            list: {
              0: {name: 'Milk',    cost: 5 , description: 'Fresh 2 weeks'},
              1: {name: 'Juice',   cost: 5 , description: 'cold'},
              2: {name: 'Corn',    cost: 2 , description: 'on sale'},
              3: {name: 'Apple',   cost: 1 , description: 'on sale'},
              4: {name: 'Orange',  cost: 1 , description: 'on sale'},
              5: {name: 'Steak',   cost: 10, description: 'fresh cut'},
              6: {name: 'Pork',    cost: 12, description: 'fresh cut'},
            },
            description: '',
          },
					'Store': {
            templateInfo: {
              'name': {
                type: 'string',
                important: true
              },
              'x-cord': {
                type: 'number',
              },
              'y-cord': {
                type: 'number',
              },
              'description': {
                type: 'string'
              },
            },
            templateOrder: [],
            rules: {},
            list: {
              0: {name: 'Average Store', 'x-cord': 10, 'y-cord': 10, description: 'basic store stuff'}
            },
            description: '',
          },

        },
      }
  },
  getters: {
    listAllEntity: (state) => {
      state;
    }
  },
  mutations: {
    //ENTITY
  },
  actions: {
  },
  modules: {
  }
})
