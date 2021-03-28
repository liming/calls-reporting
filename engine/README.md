# Data Engine

This is a tiny data process engine, which contains methods to query & join data.

- Normally this should be an service can be deployed to a server or AWS lambda
- Data process engine should provide a well defined interface (For example GRPC) to allow other server connect to it. But to simplify the process we only have JavaScript methods.
- introduce stream-json to read JSON data with a stream, which can efficiently limited CPU and memory usage.

## `yarn test`

Run tests in test folder