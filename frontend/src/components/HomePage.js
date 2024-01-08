import React from 'react';
import Room1Example from '../assets/room1.jpg';
import Room2Example from '../assets/room2.jpg';
import Room3Example from '../assets/room3.jpg';
function HomePage() {
    return (
        <div className="container-fluid p-0">
            <header
                style={{
                    background: `rgba(0, 0, 0, 0.5)`
                }}
                className="text-white text-center py-5">
                <h1>Welcome to BookMyStay</h1>
                <p>Your perfect getaway</p>
            </header>

            <div className='container'>
                <section className="my-5">
                    <h2 className="text-center text-white">Explore Our Rooms</h2>
                    <div className="d-flex justify-content-around flex-wrap">

                        <div className="card m-2" style={{ width: "18rem" }}>
                            <img src={Room1Example} className="card-img-top" alt="Deluxe Room" />
                            <div className="card-body">
                                <h5 className="card-title">Deluxe Room</h5>
                                <p className="card-text">Experience comfort and elegance in our Deluxe Room, perfect for relaxation.</p>
                            </div>
                        </div>

                        <div className="card m-2" style={{ width: "18rem" }}>
                            <img src={Room2Example} className="card-img-top" alt="Executive Suite" />
                            <div className="card-body">
                                <h5 className="card-title">Executive Suite</h5>
                                <p className="card-text">Our Executive Suite offers a luxurious space with a separate living area, ideal for business and leisure travelers.</p>
                            </div>
                        </div>

                        <div className="card m-2" style={{ width: "18rem" }}>
                            <img src={Room3Example} className="card-img-top" alt="Family Suite" />
                            <div className="card-body">
                                <h5 className="card-title">Family Suite</h5>
                                <p className="card-text">Spacious and comfortable, our Family Suite is perfect for those traveling with children or in small groups.</p>
                            </div>
                        </div>


                    </div>
                </section>
            </div>



            <footer className="bg-dark text-white text-center py-3"
                style={{
                    width: '100vw',
                    position: 'fixed',
                    bottom: '0',
                }}
            >
                <p>&copy; 2024 XiaolongChang. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default HomePage;
