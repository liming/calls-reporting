const { findRecords, joinRecords } = require("../../engine");

const findAllParticipants = async (calls) => {
  const allParticipants = calls.reduce((result, call) => {
    return result.concat(call.participants);
  }, []);

  const filteredParticipants = allParticipants.reduce((result, call) => {
    const x = result.find((p) => p.user_id === call.user_id);

    return x ? result : result.concat([call]);
  }, []);

  const participants = await joinRecords({
    records: filteredParticipants,
    tableName: "users",
    joinKey: "user_id",
    joinFields: [
      { key: "first_name", name: "user_first_name" },
      { key: "last_name", name: "user_last_name" },
    ],
  });

  return participants.map((p) => ({
    user_id: p.user_id,
    user_name: `${p.user_first_name} ${p.user_last_name}`,
  }));
};

const findCalls = async ({ start = 0, limit = 30, onlyException = false }) => {
  const { records: rawCalls, count } = await findRecords({
    tableName: "calls",
    start,
    limit,
    onlyException,
    exception: { columnName: "duration", min: 120000 },
  });

  const calls = await joinRecords({
    records: rawCalls,
    tableName: "teams",
    joinKey: "team_id",
    joinFields: [{ key: "name", name: "team_name" }],
  });

  const allParticipants = await findAllParticipants(calls);

  // replace users in participants
  const mergedCalls = calls.reduce((results, call) => {
    call.participants = call.participants.map((p) => {
      const participant = allParticipants.find(
        (item) => item.user_id === p.user_id
      );

      if (!participant) {
        return p;
      }

      return Object.assign({}, p, { user_name: participant.user_name });
    });

    return results.concat(call);
  }, []);

  return { records: mergedCalls, total: count };
};

module.exports = { findCalls };
