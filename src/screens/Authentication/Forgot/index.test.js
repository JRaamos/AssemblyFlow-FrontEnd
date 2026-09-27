import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter } from 'react-router-dom';
import Page from './'; 

it('Test case - Forgot page', () => {
  
    mount(<MemoryRouter><Page /></MemoryRouter>);
    cy.get('input[type="text"]').type('tester@uorak.com');

});
