import {QueryClient, useQuery} from 'react-query';
import {useCallback} from 'react';
import {ISSUES_URL} from '@env';

const GET_ISSUE = 'GET_ISSUE';
const queryClient = new QueryClient();

/**
 * Hook that requests one issue.
 *
 * @param {string} issueId Unique identifier of one issue.
 *
 * @return {object} Issue object.
 */
export default function useIssue({issueId}) {
  async function fetchBook() {
    const response = await fetch(`${ISSUES_URL}/issues/${issueId}`);
    const json = await response.json();
    return json;
  }

  return useQuery([GET_ISSUE, issueId], fetchBook);
}

/**
 * Callback executed after an invalid issue is passed.
 *
 * @param {string} issueId Unique identifier of one issue.
 *
 * @return {function} Callback function.
 */
export function useInvalidateIssue({issueId}) {
  const invalidateCache = useCallback(
    function () {
      queryClient.invalidateQueries(GET_ISSUE, issueId);
    },
    [issueId],
  );
  return invalidateCache;
}
