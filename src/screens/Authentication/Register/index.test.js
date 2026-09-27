import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter } from 'react-router-dom';
import Page from './';

it('Test case - Register page', () => {
  
    mount(<MemoryRouter><Page /></MemoryRouter>);
    cy.get('input[type="text"]').eq(0).type('Tester');
    cy.get('input[type="text"]').eq(1).type('tester@uorak.com');
    cy.get('input[type="password"]').type('123456');

});
