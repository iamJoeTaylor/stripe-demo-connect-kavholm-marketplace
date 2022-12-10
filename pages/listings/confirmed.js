import React from 'react';
import {redirect} from '../../utils/redirect';
import Link from 'next/link';

import Layout from '../../components/layout';
import API from '../../helpers/api';
import ListingForm from '../../components/listingForm';
import getConfig from 'next/config';

class ConfirmedListing extends React.Component {
  constructor(props) {
    super();
  }

  static async getInitialProps(context) {
    return {};
  }

  render() {
    let isTestMode = getConfig().publicRuntimeConfig.isTestMode;

    return (
      <Layout
        isAuthenticated={this.props.isAuthenticated}
        userProfile={this.props.userProfile}
        title="Listing confirmed"
      >
        <div className="home">
          <div className="splash-image">
            <div className="container">
              <div className="popover">
                <h1>You're all set for Tatooine!</h1>
                <div className="host">
                  <img src="/static/obi2.jpg" />
                  Booked with <strong>Joe-bi-Wan Kenobi</strong>
                </div>

                <div className="details">
                  <div className="confirmation">
                    <div className="title">
                      Confirmation code
                    </div>
                    <div>
                      R2D2C3P0-III
                    </div>
                  </div>
                  <div className="checkin">
                    <div className="title">
                      Check-in
                    </div>
                    <div>
                      A long long time ago
                    </div>
                  </div>
                  <div className="directions">
                    <div className="title">
                      Getting there
                    </div>
                    <div>
                      YT-1300fp light freighter
                    </div>
                  </div>
                  <div className="hints">
                    <div className="title">
                      Things to know
                    </div>
                    <div>
                      <a href="#">Instructions and planet rules</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <style jsx>{`
          .host {
            margin-top: -15px;
            margin-bottom: 18px;
          }
          .host img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin-right: 12px;
          }
          .title {
            font-weight: 800;
            font-size: 17px;
          }
          .details > div {
            margin-bottom: 14px;
            font-size: 15px;
          }
          .home {
            width: 100%;
            position: absolute;
            top: 160px;
            left: 0;
            right: 0;
            bottom: 0;
          }

          h1 {
            font-size: 27px;
            font-weight: 600;
            color: #202020;
            width: 70%;
            margin-bottom: 30px;
          }

          .splash-image {
            width: 100%;
            height: 100%;
            position: relative;
            object-fit: cover;
            vertical-align: bottom;

            background: linear-gradient(
                0deg,
                rgba(255, 255, 255, 0) 50%,
                #ffffff 100%
              ),
              url(/static/tat-1.png)
                no-repeat;
            background-size: cover;
            background-position: center center;
          }

          .popover {
            padding: 20px;
            position: relative;
            width: 100%;

            background: #ffffff;
            border: 0;
            box-shadow: 0 15px 35px 0 rgba(50, 50, 93, 0.1),
              0 5px 15px 0 rgba(0, 0, 0, 0.07);
            border-radius: 6px;
          }

        `}</style>
      </Layout>
    );
  }
}

export default ConfirmedListing;
