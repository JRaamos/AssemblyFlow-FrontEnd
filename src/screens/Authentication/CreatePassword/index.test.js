import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter } from 'react-router-dom';
import Page from './';

it('Test case - Create Password page', () => {
  
    mount(<MemoryRouter><Page /></MemoryRouter>);
    cy.get('input[type="password"]').eq(0).type('123456');
    cy.get('input[type="password"]').eq(1).type('123456');

});
