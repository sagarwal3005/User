import React from "react";
import LoadMore from "../LoadMore";
import classnames from "classnames";
import API from "../../../services/api";
import PostDetail from "../Post/postDetail";
import { Nav, NavItem, NavLink } from "reactstrap";

let ALPHABET = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
];
class Profiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 0,
      total: 0,
      data: [],
      artistId: null,
      image: null,
      items: [],
      visible: true,
      error: false,

      activeLetter: undefined
    };
    this.loadMore = this.loadMore.bind(this);
  }
  componentDidMount() {
    this.getCategouries();
  }

  getCategouries() {
    API.post("categories/list")
      .then(res => {
        this.setState(
          {
            categories: res.data.categories
          },
          () => {
            this.findArtistId();
          }
        );
      })
      .catch(e => {});
  }

  findArtistId() {
    const { categories } = this.state;
    if (!categories) return;
    var image = null;
    var artistId = null;

    categories.map(c => {
      if (c.title === "Artists") {
        console.log(c);
        image = c.image;
        artistId = c._id;
      }
    });

    this.setState(
      {
        image,
        artistId
      },
      () => this.getPostsList()
    );
  }

  getPostsList() {
    API.post("posts/list", {
      page: this.state.activePage,
      size: 10,
      categoryid: "5d0524312df6e110e8200797",
      letter: this.state.activeLetter
        ? this.state.activeLetter.toLowerCase()
        : undefined
    })
      .then(res => {
        console.log(res.data);
        let items = this.state.items;
        if (this.state.activePage) {
          items = [...items, ...res.data.posts];
        } else {
          items = res.data.posts;
        }
        this.setState({
          items,
          activePage: this.state.activePage + 1,
          visible: res.data.total !== items.length && res.data.total
        });
      })
      .catch(error => {});
  }

  loadMore() {
    this.getPostsList();
  }

  renderAlphabet() {
    return ALPHABET.map((item, index) => {
      return (
        <NavItem style={{ margin: 3 }} key={index}>
          <NavLink
            onClick={() => {
              this.setState({ activeLetter: item, activePage: 0 }, () =>
                this.getPostsList()
              );
            }}
            className={classnames({ active: this.state.activeLetter === item })}
          >
            {" "}
            {item}
          </NavLink>
        </NavItem>
      );
    });
  }

  render() {
    const { items } = this.state;
    return (
      <div
        className="d-flex flex-wrap post-row"
        style={{ paddingBottom: "10rem" }}
      >
        <Nav tabs className="d-flex justify-content-center artist-tab w-100">
          <NavItem style={{ margin: 3 }}>
            <NavLink
              className={classnames({ active: !this.state.activeLetter })}
              onClick={() => {
                this.setState({ activeLetter: undefined, activePage: 0 }, () =>
                  this.getPostsList()
                );
              }}
            >
              All
            </NavLink>
          </NavItem>
          {this.renderAlphabet()}
        </Nav>
        {items.length ? (
          items.map((ite, i) => (
            <PostDetail index={i} data={ite} key={i} col={4} />
          ))
        ) : (
          <p
            className="m-color"
            style={{
              textAlign: "center",
              padding: 35,
              width: "100%",
              marginTop: 25
            }}
          >
            NO RESULTS WERE FOUND!
          </p>
        )}
        {this.state.visible ? <LoadMore loadMoreFunc={this.loadMore} /> : null}
      </div>
    );
  }
}
export default Profiles;
