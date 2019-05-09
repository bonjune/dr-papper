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
                        <img src={testimage} alt="testimage"/>
                        <p className="title font-weight-normal"><div className="ellipse">{review.title}</div></p>
                        <p className="content font-weight-light multi-ellipse">Ipsum Lorem ipsum dolor, maiores distinctio perferendis quas recusandae architecto consequatur quis, nobis quibusdam iste. ipsum Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio perferendis quas ipsum ullam ex accusamus veritatis iusto neque, dolorum ea similique facilis, reprehenderit cum alias commodi hic! Hic, officia in. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem maxime rerum doloremque, minus neque quos sapiente, autem esse error animi deserunt. Officiis exercitationem sint sit consequuntur odio minima dignissimos ipsam. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint rem, sequi ipsam veritatis atque velit. Eaque autem neque molestias est architecto at quisquam, tempora, quo quis reprehenderit unde nobis harum? </p>
                        <section className="tags">
                            <CreateTags name="Juho" />
                            <CreateTags name="Kim" />
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