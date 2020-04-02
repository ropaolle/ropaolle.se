import gql from 'graphql-tag';

export const CREATE_LOG = gql`
  mutation CreateLogs($data: LogCreateInput!) {
    createLog(data: $data) {
      id
    }
  }
`;

export const LOGS = gql`
  query {
    allLogs(first: 100, orderBy: "id_DESC") {
      id
      createdAt
      message
      level
      jsonData
    }
  }
`;

export const LOGS_PAGINATED = (pageSize, page, orderBy = 'id_DESC') => gql`
  query {
    allLogs(first: ${pageSize}, skip: ${(page - 1) * pageSize}, orderBy: "${orderBy}") {
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

export const COUNT = gql`
  query {
    _allLogsMeta {
      count
    }
  }
`;
