import React, {createContext, useCallback, useMemo} from 'react';
import {QueryClient, useQuery} from 'react-query';
import {BACKEND_URL} from '../consts/backend';

const IssuesContext = createContext();
export default IssuesContext;

const queryClient = new QueryClient();
const GET_ISSUES = 'GET_ISSUES';

async function fetchData() {
  console.log('Trying to conect');
  const response = await fetch(`${BACKEND_URL}/issues/`);
  const json = await response.json();
  return json;
}

export function IssueContextProvider({children}) {
  const {isSuccess, isLoading, data} = useQuery(GET_ISSUES, fetchData);

  const invalidateIssuesListCache = useCallback(function() {
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
