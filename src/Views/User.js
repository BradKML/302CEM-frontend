import React, { useEffect, useState } from "react";
import { getUser } from "../api";
import { useParams } from "react-router-dom";
import Section from "../Components/Section";
import Herotitle from "../Components/Herotitle";
import Centerlevel from "../Components/Centerlevel";
import Table from "../Components/Table";
import Title from "../Components/Title";
import Breadcrumb from "../Components/Breadcrumb";
import Graph from "../Components/Graph";
import ScrollAnimation from "react-animate-on-scroll";

export default () => {
  let { username } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    setError(null)
    setLoading(true)
    getUser(username)
      .then(user => {
        setUser(user);
        setLoading(false);
      })
      .catch(e=>{
        setError(e)
        setLoading(false)
      });
  }, [username]);
  const lastData = user && user.table[user.table.length - 1];
  if (error) return error.message
  return loading ? (
    <div>
      <Herotitle subtitle="User"></Herotitle>
      loading...
      </div>
  ) : user ? (
    <div>
      <Herotitle subtitle="User"></Herotitle>
      <div className="container" style={{ marginTop: 20 }}>
        <div className="box fade delay-s">
          <Breadcrumb page="Home" currentpage="User"></Breadcrumb>

          <div className="level-item has-text-centered">
            <div>
              <figure className="image is-128x128">
                <img
                  className="is-rounded"
                  alt=""
                  src={"http://avatars.io/twitter/"+username}
                ></img>
              </figure>
            </div>
          </div>
          <Centerlevel title={user.name}></Centerlevel>
          <Centerlevel heading={"Created at "+user.cre}></Centerlevel>
          <br />
          <nav className="level is-mobile" style={{ paddingBottom: 10 }}>
            <Centerlevel
              numberAnimation
              title={lastData.tweets}
              heading="Tweets"
            ></Centerlevel>
            <Centerlevel
              numberAnimation
              title={lastData.following}
              heading="Following"
            ></Centerlevel>
            <Centerlevel
              numberAnimation
              title={lastData.followers}
              heading="Followers"
            ></Centerlevel>
            <Centerlevel
              numberAnimation
              title={user.like}
              heading="Likes"
            ></Centerlevel>
          </nav>
        </div>
        <ScrollAnimation
          animateIn="fade"
          animateOnce={true}
          duration={0.7}
          className="delay-m"
        >
          <div className="box" style={{ padding: 25 }}>
            <p className="title">Summary</p>
            <br />
            <Table data={user.table}></Table>
          </div>
        </ScrollAnimation>
        <br />
        <ScrollAnimation animateIn="fade" duration={0.7} animateOnce={true}>
          <div className="box" style={{ padding: 25 }}>
            <p className="title">Graph</p>
            <br />
            <Title title="Followers"></Title>
            <br />
            <Graph data={user.table} label="followers"></Graph>
            <br />
            <br />
            <Title title="Following"></Title>
            <br />
            <Graph data={user.table} label="following"></Graph>
            <br />
            <br />
            <Title title="Tweets"></Title>
            <br />
            <Graph data={user.table} label="tweets"></Graph>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  ) : (
    <div>
      <Herotitle subtitle="User Page"></Herotitle>
      <Section subtitle="no user found."></Section>
    </div>
  );
};
