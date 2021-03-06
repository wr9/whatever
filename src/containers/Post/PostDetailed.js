import React, { Component } from 'react';
import { Card, Button } from 'antd';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { selectPost, deletePost } from 'redux/modules/posts';

class PostDetailed extends Component {
  componentDidMount() {
    this.props.loadPost(this.props.match.params.id);
  }

  deletePost = () => {
    const { deletePost, history, match } = this.props;
    deletePost(match.params.id).then(() => history.push('/'));
  };

  render() {
    const { post } = this.props;
    return (
      <div>
        {post && (
          <Card title={post.title} style={{ width: 300 }}>
            <p>
              <b>Author:</b> {post.author}
            </p>
            <p>
              <b>Text:</b> {post.text}
            </p>
            <p>
              <b>Created:</b> {new Date(post.dateCreated).toLocaleString()}
            </p>
            <Link to={`/edit/${post.id}`}>Edit</Link>
            <Button onClick={this.deletePost}>Delete</Button>
          </Card>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.posts.selectedPost,
});

const mapDispatchToProps = dispatch => ({
  loadPost: id => dispatch(selectPost(id)),
  deletePost: id => dispatch(deletePost(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailed);
