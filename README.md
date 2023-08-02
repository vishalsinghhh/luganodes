# P2P chat app using Holepunch
#### Welcome to our P2P Chat Application with Holepunch! This application allows users to communicate securely with each other without the need for a central server or third-party service. It utilizes the Holepunch library for peer-to-peer communication, ensuring direct and efficient messaging between users.

## Key Features
1. **Secure P2P Communication:** Our application establishes direct connections between users, ensuring secure and private messaging without relying on a central server.

2. **Real-Time Messaging:** Users can send and receive messages in real-time, enabling smooth and instant communication with others in the chat network.

3. **Peer ID Assignment:** Each user is assigned a unique peer ID when they join the chat network, ensuring accurate identification and secure messaging.

4. **Decentralization:** One of the key features of our P2P Chat Application with Holepunch is its decentralization. Unlike traditional chat applications that rely on a central server to facilitate communication between users, our application operates in a fully decentralized manner.


## Technology Stack
- React.js and Next.js: The frontend of the application is built using React.js, with Next.js providing additional features and server-side rendering.
- Node.js: The backend is powered by Node.js, facilitating the integration of Holepunch and handling user authentication.
- Holepunch: The core of our application, this Node.js library enables seamless peer-to-peer communication without relying on a central server.

## Installation

Clone this repository into your required directory

In order to run the application you'll need docker installed.

* [Windows](https://docs.docker.com/windows/started)
* [OS X](https://docs.docker.com/mac/started/)
* [Linux](https://docs.docker.com/linux/started/)

### Application Container
To start the service which will be running in the containers, run the following command from the root of the project

    $ docker-compose build
    $ docker-compose up

The application will start running on port 5000.
