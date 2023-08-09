import { defineConfig } from 'cypress'
import { defineConfig } from 'cypress'

export default defineConfig({

  viewportWidth: 2000,
  viewportHeight: 1000,

  e2e: {
    'baseUrl': 'http://localhost:4200'
  },


  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts'
  }

})
