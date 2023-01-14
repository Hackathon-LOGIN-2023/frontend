import React, {createContext, useCallback, useMemo} from 'react';
import {QueryClient, useQuery} from 'react-query';
import {ISSUES_URL} from '@env';

const IssuesContext = createContext();
export default IssuesContext;

const queryClient = new QueryClient();
const GET_ISSUES = 'GET_ISSUES';

export async function fetchData() {
  console.log('Getting all issues');
  const response = await fetch(`${ISSUES_URL}/issues/`);
  const json = await response.json();
  return json;
}

export async function vote(userId, issueId, upOrDown) {
  console.log('Voting for issue');
  const body = {
    id: issueId,
    userId,
    value: upOrDown === 'up' ? 1 : -1,
  };
  const response = await fetch(`${ISSUES_URL}/issues/vote`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json'},
  });
  const json = await response.json();
  return json;
}

export function IssueContextProvider({children}) {
  const {isSuccess, isLoading, data} = useQuery(GET_ISSUES, fetchData);

  const invalidateIssuesListCache = useCallback(function () {
    queryClient.invalidateQueries(GET_ISSUES);
  }, []);

  const value = useMemo(
    () => ({
      isSuccess,
      isLoading,
      issues: data,
      invalidateIssuesListCache,
    }),
    [isSuccess, isLoading, data, invalidateIssuesListCache],
  );

  return (
    <IssuesContext.Provider value={value}>{children}</IssuesContext.Provider>
  );
}
