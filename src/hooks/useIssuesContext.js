import {useContext} from 'react';
import IssueContext from '../context/IssueContext';

export default function useIssuesContext() {
  return useContext(IssueContext);
}
