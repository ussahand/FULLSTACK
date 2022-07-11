import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import CreateBlog from './CreateBlog'

const blog = {
  title: 'Test the blog',
  author: 'by me with jest and testing-library ',
  url: 'www.blog.com',
  likes: 99,
}

describe('render contents', () => {
  test('access element by getText', () => {
    render( <Blog blog={blog}/> )
    const element = screen.getByText('Test the blog')
    expect(element).toBeDefined()
    expect(element).toHaveTextContent('Test the blog')
  })

  test('access element by css selector', () => {
    const { container } = render( <Blog blog={blog}/> )
    const div = container.querySelector('.cssBlog')
    expect(div).toBeDefined()
    expect(div).toHaveTextContent('Test the blog')
  })

  test('access element by id selector', () => {
    const dom = render( <Blog blog={blog}/> )
    const div = dom.container.querySelector('#tagId')
    expect(div).toHaveTextContent('Test the blog')
    // screen.debug(screen.getByText('Test the blog')) //show special node
  })

})

describe('Toggle the blogs', () => {
  test('at start the children are not displayed', () => {
    render( <Blog blog={blog}/> )
    // query* functions will return the element or null if it cannot be found
    const element = screen.queryByText(/blog.com/)
    expect(element).toBeNull()
    // screen.debug( screen.getByText(/www./) )
  })

  test('after clicking the button, children are displayed', () => {
    const dom = render( <Blog blog={blog}/> )
    const toggleButton = dom.container.querySelector('#toggle')

    fireEvent.click(toggleButton)
    const element = screen.queryByText(/blog.com/)
    expect(element).toHaveTextContent('www.blog.com')

    // screen.debug( document.querySelector('#tagId') )
  })
})

describe('Create a blog', () => {
  test('updates parent state and calls onSubmit and onClick event',async () => {
    const addBlog = jest.fn()
    render(<CreateBlog blog={null} toggleBox={null} addUpdate={addBlog} />)
    const usrEvnt = userEvent.setup()
    // console.log('mock', addBlog.mock.calls)

    await usrEvnt.type(screen.queryByLabelText(/title/i),'Simulated Input')
    // fireEvent.change(screen.queryByLabelText(/title/i), { target: { value: 'Simulated Input' } })
    // screen.debug(screen.queryByLabelText(/title/i))
    await usrEvnt.type(screen.queryByLabelText(/author/i), 'Hiran Jonhson')
    await usrEvnt.type(document.querySelector('#url'), 'www.myblog.com')

    await usrEvnt.click(document.querySelector('#likes'))
    await usrEvnt.click(document.querySelector('#likes'))
    await usrEvnt.click(document.querySelector('#likes'))

    expect(document.querySelector('#title')).toHaveValue('Simulated Input')

    await usrEvnt.click(document.querySelector('#submit'))
    // await usrEvnt.click(document.querySelector('#submit'))
    // fireEvent.click(document.querySelector('#submit'))

    // console.log('mock', addBlog.mock.calls)
    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].likes).toBe(3)
  })

  test('Test edit mode and twice submit', async () => {
    const addBlog = jest.fn()
    const dummy = { title:'Test blog edit', author:'Jane', url:'www', likes: 5 }
    render(<CreateBlog blog={dummy} toggleBox={null} addUpdate={addBlog} />)
    const usrEvnt = userEvent.setup()

    expect(document.querySelector('#title')).toHaveValue('Test blog edit')
    await usrEvnt.click(document.querySelector('#likes'))

    await usrEvnt.click(document.querySelector('#submit'))
    await usrEvnt.click(document.querySelector('#submit'))

    console.log('mock', addBlog.mock.calls)
    expect(addBlog.mock.calls).toHaveLength(2)
    expect(addBlog.mock.calls[0][0].likes).toBe(6)
    expect(addBlog.mock.calls[1][0].likes).toBe(0)
  })
})