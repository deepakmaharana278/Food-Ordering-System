import React from "react";
import PublicLayout from "../components/PublicLayout";
import '../styles/home.css'

const Home = () => {
  return (
    <PublicLayout>
      <section className="hero py-5 text-center" style={{backgroundImage:"url('images/hero.jpg')"}}>
        <div style={{
          backgroundColor: "rgba(0,0,0,0.6)",
          padding: "40px 20px",
          borderRadius:"10px"
        }}>
          <h1 className="display-4">Hot & Ready, Delivered Quickly</h1>
          <p className="lead">Your Tastebuds Called. We Answered. Delivered</p>

          <form method="GET" action="/search" className="d-flex" style={{maxWidth:"600px", margin:"0 auto"}}>
            <input type="text" name="q" placeholder="I would like to eat" className="form-control" style={{
              borderTopRightRadius:0,
              borderBottomRightRadius:0,
            }}/>
            <button className="btn btn-warning px-4" style={{
              borderTopLeftRadius:0,
              borderBottomLeftRadius:0,
            }}>Search</button>
          </form>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Home;
