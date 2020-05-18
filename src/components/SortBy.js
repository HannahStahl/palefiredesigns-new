import React from 'react';
import FormGroup from 'react-bootstrap/FormGroup';
import FormControl from 'react-bootstrap/FormControl';
import { sortByOptions } from '../utils';

export default ({ sortBy, setSortBy }) => (
  <div>
    <FormGroup size="lg" controlId="sortBy" className="sort-by">
      Sort by:
      <FormControl
        as="select"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="sort-by-dropdown"
      >
        {sortByOptions.map((option) => <option key={option} value={option}>{option}</option>)}
      </FormControl>
    </FormGroup>
  </div>
);
