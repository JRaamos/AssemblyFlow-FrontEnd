import React from 'react';
import { mount } from '@cypress/react';
import Page from './';

it('Test case - Create Password page', () => {
  
    mount(<Page />);
    cy.get('#password').type('123456'); 
    cy.get('#cpassword').type('123456'); 

});