import React, { Component } from 'react'
import testimage from '../../assets/img/boxmain.png'
import pinIcon from '../../assets/icons/pinIcon.png'

class FinnedBox extends Component {
  render() {
    return (
      <section className="component-finned-box">
        <div class="container">
            <div className="row">
            <div className="col-sm-auto">
            <h3 className="text-uppercase">pinned paper <span><img src={pinIcon} alt="pinned" style={{width:'30px'}}/></span> </h3>
            </div>
            </div>
            <div class="row">
                <div class="col-sm-4">
                    <img src={testimage} alt="testimage"/>
                    <p className="title font-weight-normal">Test title</p>
                    <p className="content font-weight-light">Ipsum Lorem ipsum dolor, maiores distinctio perferendis quas recusandae architecto consequatur quis, nobis quibusdam iste.</p>
                    <section className="tags">
                        <span className="badge badge-light font-weight-normal">#Light</span>
                        <span className="badge badge-light font-weight-normal">#Light</span>
                        <span className="badge badge-light font-weight-normal">#Light</span>
                    </section>
                </div>
                <div class="col-sm-4">
                    <img src={testimage} alt="testimage"/>
                    <p className="title font-weight-normal">Test title</p>
                    <p className="content font-weight-light">Ipsum Lorem ipsum dolor, maiores distinctio perferendis quas recusandae architecto consequatur quis, nobis quibusdam iste.</p>
                    <section className="tags">
                        <span className="badge badge-light font-weight-normal">#Light</span>
                        <span className="badge badge-light font-weight-normal">#Light</span>
                        <span className="badge badge-light font-weight-normal">#Light</span>
                    </section>
                </div>
                <div class="col-sm-4">
                    <img src={testimage} alt="testimage"/>
                    <p className="title font-weight-normal">Test title</p>
                    <p className="content font-weight-light">Ipsum Lorem ipsum dolor, maiores distinctio perferendis quas recusandae architecto consequatur quis, nobis quibusdam iste.</p>
                    <section className="tags">
                        <span className="badge badge-light font-weight-normal">#Light</span>
                        <span className="badge badge-light font-weight-normal">#Light</span>
                        <span className="badge badge-light font-weight-normal">#Light</span>
                    </section>
                </div>
            </div>
        </div>
      </section>
    )
  }
}

export default FinnedBox
