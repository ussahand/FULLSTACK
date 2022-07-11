describe('Blog app', function () {
  beforeEach(() => {
    // cy.request('POST', 'http://localhost:3001/api/testing/reset')
    //   .then(resp => {
    //     expect(resp.status).to.eq(200)
    //     expect(resp.body).contains('test db has been reset')
    //   })

    // cy.request('POST', 'http://localhost:3001/api/login', { name: 'Test', userName: 'test', password: '656565' })
    //   .then( resp => window.localStorage.setItem('userInfo', JSON.stringify(resp.body)))
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    //  cy.visit('http://localhost:3000')
    cy.contains('Blogs')
    cy.contains('login/signup')
  })

  it('Delete all login from the DB', function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
      .then(resp => {
        expect(resp.status).to.eq(204)
        // expect(resp.body).contains('test db has been reset')
      })
  })

})

describe('Signup/Login/Logout', function () {
  it('fails with wrong credentials', function () {
    cy.get('#userName').clear().type('ali')
    cy.get('#password').clear().type('ali')
    cy.contains('login').click()
    cy.contains('validation failed').should('have.css', 'color', 'rgb(255, 0, 0)')

    // cy.log('rererereer', 12222)
  })

  it('Signup', function () {
    cy.get('input:first').clear().type('Test') // name
    cy.get('#userName').clear().type('test')
    cy.get('input:last').clear().type('656565') // password
    cy.contains('login').click()
  })

  it('logout successfully', function () {
    cy.get('#quit').click()
    cy.contains('login/signup')
  })

  it('succeeds with correct credentials', function () {
    cy.get('#userName').clear().type('test')
    cy.get('#password').clear().type('656565')
    cy.contains('login').click()
    cy.contains('Test logged in')
  })

})

describe('When logged in', function () {
  beforeEach(function () {
    // log in user here
  })

  it('Click the add icon', function () {
    cy.get('#add').click()
    cy.contains('Create a Blog')
  })

  it('A blog can be created', function () {
    cy.get('#title').clear().type('cypress is wonderfull e2e test tools')
    cy.get('#author').clear().type('with me')
    cy.get('#url').clear().type('www.e2e.com')
    cy.get('#likes').click().click().click().click()
    cy.get('#submit').click()
    // cy.contains('blog created')
    cy.contains('e2e test')
  })

  it('create a second blog', function () {
    cy.get('#title').clear().type('Cypress is amazing')
    cy.get('#author').clear().type('By you')
    cy.get('#url').clear().type('www.e2e.com')
    cy.get('#likes').click()
    cy.get('#submit').click()
    // cy.contains('blog created')
    cy.contains('amazing')
  })

  it('Cancel the create blog container', function() {
    cy.get('#cancel').click()
  })

  it('Test toggle', function() {
    cy.contains('URL:').should('not.exist')
    cy.get('#toggle').click()
    cy.contains('URL:').should('exist')
  })

  it('Edit blog and like it', function() {
    cy.get('#edit').click()
    cy.get('#likes').click().click()
    cy.contains(3)
    cy.get('#submit').click()
    // cy.contains('prop updated')
    cy.contains('Likes: 3')
  })
  it('Sorted blogs', function(){
    cy.contains(/amazing.*wonderful/) // amazing has 3 likes and wonderful has 4
  })
  it('Delete a blog', function(){
    cy.get('#delete').click()
    cy.contains(/blog deleted/)
  })
})