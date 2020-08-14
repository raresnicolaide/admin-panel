import React from 'react'
import PostItem from './PostItem';
import './PostList.css';

class PostList extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }
    }
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(posts => {
                this.setState({ posts });
            })
    }
    render() {
        return (
            <div className='postList'>
                <h2>Lista postari:</h2>
                {this.state.posts.map((post, index) => {
                    return ( 
                        <div className='postItem'>
                            <PostItem 
                            title={post.title}
                            body={post.body}
                            key={index}/>
                        </div>
                    )
                })}
            </div>  
        )
    }
}

export default PostList;