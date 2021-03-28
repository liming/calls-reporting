const StreamArray = require("stream-json/streamers/StreamArray");
const fs = require("fs");

/**
 *
 * @param {string} tableName
 * @param {string} columnName
 * @param {string | number} v
 * @returns
 */
const findRecordByKey = ({ tableName, columnName, v }) => {
  return new Promise((resolve, reject) => {
    const jsonStream = StreamArray.withParser();

    fs.createReadStream(`../data/${tableName}.json`).pipe(jsonStream.input);

    let record = null;

    jsonStream.on("data", ({ value }) => {
      if (value[columnName] === v) {
        record = value;
      }
    });

    jsonStream.on("end", () => {
      if (!record) {
        console.error(
          `Cannot find record ${v} with ${columnName} in ${tableName}`
        );

        resolve({});
      } else {
        resolve(record);
      }
    });
  });
};

const isException = (value, exceptionOptions) => {
  if (exceptionOptions && exceptionOptions.columnName && exceptionOptions.min) {
    if (value[exceptionOptions.columnName] < exceptionOptions.min) {
      return true;
    }
  }

  return false;
};

const findRecords = ({
  tableName,
  start = 0,
  limit = 30,
  onlyException,
  exception,
}) => {
  return new Promise((resolve, reject) => {
    const jsonStream = StreamArray.withParser();

    try {
      fs.createReadStream(`../data/${tableName}.json`).pipe(jsonStream.input);
    } catch (err) {
      reject(err);
    }

    const records = [];
    let count = 0;

    jsonStream.on("data", ({ key, value }) => {
      const isValueException = isException(value, exception);

      if ((onlyException && isValueException) || !onlyException) {
        count++;

        if (count > start && count <= start + limit) {
          if (isValueException) {
            value.alert = true;
          }

          records.push(value);
        }
      }
    });

    jsonStream.on("end", () => {
      resolve({ count, records });
    });
  });
};

module.exports = { findRecordByKey, findRecords };
