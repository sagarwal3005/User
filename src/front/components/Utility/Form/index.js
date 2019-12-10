import React from "react";
import API from "../../../services/api";

class BookingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      instagram: '',
      checked: false,
      sent: false
    }
  }

  submit(e) {
    e.preventDefault();
    if (!this.state.checked || !this.state.email || !this.state.instagram || !this.state.name || !this.state.phone)
      return;
    let { email, instagram, name, phone } = this.state;
    let url = this.props.category === 'VIP Parties' ? 'guests/submit' : 'contacts/submit';
    API.post(url, {
      postid: this.props.postid,
      email,
      instagram,
      name,
      phone
    })
      .then(response => {
        this.setState({ sent: true })
      }).catch(err => {

      })
  }


  render() {
    return (
      <div className="pb-5 pt-5" style={{ position: 'relative' }} >
        {this.state.sent ?
          <div style={{
            position: 'absolute', top: 0, left: 0,
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100%',
            backgroundColor: 'white', zIndex: 10
          }} >
            <h6 className="pb-3 pt-3 text-center regular h5">We will be in touch soon to confirm your spot on the guestlist 👍🏿</h6>
          </div> : null}
        <h6 className="pb-4 pt-4 text-center regular h5">Want to get on the guestlist ? Enter your details here </h6>
        <form onSubmit={(e) => { this.submit(e) }} className="booking-form">
          <div className="d-flex justify-content-between">
            <input value={this.state.name} onChange={(value) => { this.setState({ name: value.target.value }) }} className="input-txt" type="text" name="name" placeholder="Name *" />
            <input value={this.state.email} onChange={(value) => { this.setState({ email: value.target.value }) }} className="input-txt" type="email" name="_replyto" placeholder="Email *" />
          </div>
          <div className="d-flex justify-content-between">
            <input value={this.state.phone} onChange={(value) => { this.setState({ phone: value.target.value }) }} className="input-txt" type="number" name="_phone" placeholder="Phone *" />
            <div className="insta-container">
              <span>@</span>
              <input value={this.state.instagram} onChange={(value) => { this.setState({ instagram: value.target.value }) }} className="input-txt" type="text" name="_instagram" placeholder="Instagram *" />
            </div>
          </div>

          <input defaultValue={this.props.venue} className="input-txt d-none" type="text" name="_event" placeholder="I like to be at ..." />

          <div className="checkbox-container">
            <div className="checkbox">
              <input type="checkbox" id="checkbox" onChange={() => { this.setState({ checked: !this.state.checked }) }} />
              <label htmlFor="checkbox"></label>
            </div>
            <p>I have read and agreed to the privacy policy</p>
          </div>

          <ul>
            <li>Guest list does not guarantee entry.</li>
            <li>Door staff at specified venue reserve the right to refuse entry.</li>
            <li>Smart dress is essential for all venues represented on Feed Your Image.</li>
          </ul>

          <div className="position-relative d-flex justify-content-end">
            <input
              onClick={(e) => { this.submit(e) }}
              disabled={(!this.state.checked || !this.state.email || !this.state.instagram || !this.state.name || !this.state.phone)}
              className="input-submit"
              type="submit" value="Done" />
            <div className="f-btn"><span>Submit</span></div>
          </div>

        </form>

      </div>
    )
  }
}

export default BookingForm;
