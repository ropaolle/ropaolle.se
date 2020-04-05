import gql from 'graphql-tag';

export const CREATE_LOG = gql`
  mutation CreateLogs($data: LogCreateInput!) {
    createLog(data: $data) {
      id
    }
  }
`;

export const LOGS_PAGINATED = gql`
  query LogsPaginated($first: Int, $skip: Int, $orderBy: String) {
    allLogs(first: $first, skip: $skip, orderBy: $orderBy) {
      id
      createdAt
      message
      level
      jsonData
    }
    _allLogsMeta {
      count
    }
  }
`;
