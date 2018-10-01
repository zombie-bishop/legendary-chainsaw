var systemStart = {

  turns = function() {
    var tempEffectiveVars = effectiveVars;

    // random event effecting base resource.
    var currentResource = userHistory.resource;
    var turnPop = this.effectiveVars.popBase;
    var turnPopValue = this.effectiveVars.popValue;
    var turnFame = this.effectiveVars.fame;

    // Each item in the inventory will effect the how the resource is calculated
    this.userHistory.currentInventory.forEach(function(inventoryItem) {
      var curEffectVal = inventoryItem.varEffectVal ||
        this.getRandomInt(inventoryItem.effectRange[0], inventoryItem.effectRange[1]);
      switch(inventoryItem.varEffect) {
        case 'popBase': 
          turnPop = turnPop * curEffectVal;
          break;
        case 'popValue':
          turnPopValue = turnPopValue * curEffectVal;
          break;
        case 'turnFame':
          turnFame = turnFame * curEffectVal;
          break;
        case 'addResource':
          // this is done through a negitive cost
          break;
      }
      currentResource -= inventoryItem.cost;
    });

    turnResource = turnPop * turnPopValue * (turnFame / 100);
    
    // Update the users resource history
    userHistory.resourceHistory.push({
      beginingResource: userHistory.resource,
      turnResource: turnResource,
      turnCost: (userHistory.resource - currentResource),
      resourceAfterCost: currentResource,
      totalResource: (currentResource + turnResource)
    });

    // Update the users resource value
    userHistory.resource += (currentResource + turnResource);
  },

  getRandomInt: function (min, max) {
    min = min*100;
    max = max*100;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  inventoryItemTemplate: {
    itemName: null,
    effectRange: [],
    varEffect: null,
    varEffectVal: null,
    effectTitle: null,
    effectDescription: null,
    cost: 0
  },

  effectiveVars: {
    popBase: 1000,
    popValue: 1,
    fame: 50
  },

  userHistory: {
    resource: 100,
    resourceHistory: [],
    currentInventory: [],
    inventoryHistory: []
  },

  randomizeEvent: function(Chance, EfectArray) {
    Math.floor((Math.random() * 1000) + 1);
    if(Math.floor((Math.random() * 1000) + 1) < (Chance * 10)){
      return EfectArray[Math.floor(Math.random() * myArray.length)];
    } else {
      return null;
    }
  }
}


var randomEvents = [
  {
    eventType: 'pos',
    effectRange: null,
    varEffect: 'popBase',
    varEffectVal: 1.1,
    inventoryEffect: null,
    inventoryEffectVal: null,
    effectTitle: 'Population Growth',
    effectDescription: 'The population in your area has grown by 10%.'
  }, {
    eventType: 'neg',
    effectRange: [0.9, 0.99],
    varEffect: 'popBase',
    varEffectVal: null,
    inventoryEffect: null,
    inventoryEffectVal: null,
    effectTitle: 'Population Shrank',
    effectDescription: 'The population in your area has shrank.'
  }, {
    eventType: 'pos',
    effectRange: [1.01, 1.1],
    varEffect: 'fame',
    varEffectVal: null,
    inventoryEffect: null,
    inventoryEffectVal: null,
    effectTitle: 'You are more popular',
    effectDescription: 'Your fame has increased.'
  }, {
    eventType: 'neg',
    effectRange: [0.9, 0.99],
    varEffect: 'fame',
    varEffectVal: null,
    inventoryEffect: null,
    inventoryEffectVal: null,
    effectTitle: 'You are less popular',
    effectDescription: 'Your fame as decreased.'
  },
  
]

var schedualedEvents = {
  1: 
}

var randomizeEvent = function(Chance, EfectArray) {
  Math.floor((Math.random() * 1000) + 1);
  if(Math.floor((Math.random() * 1000) + 1) < (Chance * 10)){
    return EfectArray[Math.floor(Math.random() * myArray.length)];
  } else {
    return null;
  }
};
