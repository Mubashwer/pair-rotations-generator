import { defineConfig } from 'cypress'

export default defineConfig({
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e-tests/**/*.cy.{js,jsx,ts,tsx}',
  },
})
