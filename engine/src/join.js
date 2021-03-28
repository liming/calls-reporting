const { findRecordByKey } = require("./query");

const joinRecord = async ({
  leftRecord,
  tableName,
  joinKey,
  v,
  joinFields,
}) => {
  try {
    const rightRecord = await findRecordByKey({
      tableName,
      columnName: joinKey,
      v,
    });
    const joinedResult = joinFields.reduce((results, field) => {
      return Object.assign({}, results, {
        [field.name]: rightRecord[field.key],
      });
    }, {});
    return Object.assign({}, leftRecord, joinedResult);
  } catch (err) {
    console.error("merge record failed: ", err);

    return leftRecord;
  }
};

/**
 *
 * @param {array} records A list of records (left)
 * @param {string} tableName table name (right)
 * @param {string} joinKey index column (for example team_id)
 * @param {array} joinFields a list of fields need to be joined in to records.
 */
const joinRecords = async ({
  records,
  tableName,
  joinKey,
  joinFields,
}) => {
  const promises = records.map(
    async (record) =>
      await joinRecord({
        leftRecord: record,
        tableName,
        joinKey,
        v: record[joinKey],
        joinFields,
      })
  );

  return await Promise.all(promises);
};

module.exports = { joinRecord, joinRecords };
