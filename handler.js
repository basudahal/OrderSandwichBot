'use strict';
const close = (intentRequest, sessionAttribute, fulfillmentState, message) => {
  intentRequest.sessionState.intent.state = fulfillmentState;
  return {
    'sessionState': {
      'sessionAttribute': sessionAttribute,
      'dialogAction': {
        'type': 'Close'
      },
      'intent': intentRequest.sessionState.intent
    },
    'messages': [message]
  }
}

const delegate = (intentRequest, sessionAttributes, slots) => {
  return {
    'sessionState': {
      'sessionAttributes': sessionAttributes,
      'dialogAction': {
        'type': 'Delegate',
      },
      'intent':{
        'name': intentRequest.sessionState.intent.name,
        'slots': slots
      }
    }
  }
}

const dispatch = (intentRequest) => {
  let source = intentRequest.invocationSource;
  let sessionAttributes = intentRequest.sessionState.sessionAttributes;
  let slots = intentRequest.sessionState.intent.slots;
  if(source === "DialogCodeHook"){
    return delegate(intentRequest, sessionAttributes, slots);
  }
  if(source === "FulfillmentCodeHook"){
    let message = {
      contentType: 'PlainText',
      content: 'The sandwich is ready.'
    }
    return close(intentRequest, sessionAttributes, 'Fulfilled', message);
  }
}

module.exports.orderFood = async (event) => {
  console.log(event);
  return dispatch(event);
};
