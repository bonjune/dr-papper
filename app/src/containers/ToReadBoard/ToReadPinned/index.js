import React, {Component} from 'react'
import pinIcon from '../../../assets/icons/pinIcon.png'


class ToReadPinned extends Component {
    render(){
        // init
        let reviews = null;
        for (let i in this.props){
            reviews = this.props[i];
        }
        console.log(reviews)
        
        function check(review) {
            let div = null;
            if(review.toRead) {
                if(review.pinned) {
                    div = (
                        <div class="col-sm-4 box">
                        <p className="title font-weight-normal">{review.title}</p>
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
            return div;
        }
      
        return (
          <section className="component-read-pinned-box">
          <div class="container">
              <div className="row">
              <div className="col-sm-auto">
              <h3 className="text-uppercase">pinned paper <span><img src={pinIcon} alt="pinned" style={{width:'30px'}}/></span> </h3>
              </div>
              </div>
              <div class="row">
                { reviews && reviews.map(review => {
                    return (
                      check(review)
                    )
                })}
              </div>
          </div>
        </section>
        )
    }
}

export default ToReadPinned