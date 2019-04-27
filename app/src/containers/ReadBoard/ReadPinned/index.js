import React, {Component} from 'react'

class ReadPinned extends Component {
    render(){
        return (
            <div class="col-sm-4">
            {/* <img src={testimage} alt="testimage"/> */}
            <p className="title font-weight-normal">{this.props.review.title}</p>
            <p className="content font-weight-light">Ipsum Lorem ipsum dolor, maiores distinctio perferendis quas recusandae architecto consequatur quis, nobis quibusdam iste.</p>
            <section className="tags">
                <span className="badge badge-light font-weight-normal">#Light</span>
                <span className="badge badge-light font-weight-normal">#Light</span>
                <span className="badge badge-light font-weight-normal">#Light</span>
            </section>
            </div>
        )
    }
}

export default ReadPinned