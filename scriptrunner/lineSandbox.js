const contexts = new Map();

const getCtxId = function(e) {
    if (e.source.type === 'user')  return e.source.userId;
    if (e.source.type === 'group') return e.source.groupId;
    if (e.source.type === 'room')  return e.source.roomId;
};

const getCtxMap = function(ctxId) {
    if (!contexts.has(ctxId)) {
        contexts.set(ctxId, new Map());
    }
    return contexts.get(ctxId);
};


module.exports = function(client, event){
    let ctxId = getCtxId(event);

    const wrapReply = function(ctxId){
        return function (message) {
            if(!(message instanceof String)) message = String(message);
            client.pushMessage(ctxId, {type: 'text', 'text': message});
        };
    };

    return {
        event: event,
        message: event.message,
        reply: wrapReply(ctxId),
        ctx: getCtxMap(ctxId),
    };
};