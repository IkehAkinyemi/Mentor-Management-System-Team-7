# Mentor-Management-System

Mentors Management system is a people management app that enables proper.
coordination of mentors needed to execute projects, ranging from recruitment to off-boarding. Ensue to go through the app doc below to read more and follow all the instructions.

[Contributor's wiki](https://github.com/ALCOpenSource/Mentor-Management-System-Team-7/wiki)

## Requirements
To build and run this project, you will need:
-   Go v1.16 or later
-   [Docker](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)
-   [make(1)](https://man7.org/linux/man-pages/man1/make.1.html) utility
-   [Redis](https://redis.io/)
-   Mongo Database


## Tools used:

- **Gin**: Gin is a lightweight and fast web framework for Go that served as the foundation for building the backend of our Mentor-Management-System-Team-7 project. With Gin, we created robust and scalable APIs quickly and efficiently. Its simplicity, performance, and extensive middleware support make it an excellent choice for handling HTTP requests, routing, and implementing various features such as validation, binding, and error handling. Gin's ecosystem is rich, offering a wide range of extensions and libraries that can enhanced our development process and productivity.

- **Redis**: Redis is a powerful in-memory data store that we utilized within our Mentor-Management-System-Team-7 project for managing Paseto tokens. Specifically, we leveraged Redis for token blacklisting, allowing us to revoke and invalidate tokens when necessary. By utilizing Redis for token management, we can efficiently handle token revocation and maintain a secure and reliable authentication system. Redis's speed, flexibility, and support for various data structures make it an ideal choice for this purpose.

- **hibiken/asynq**: To handle long-running and asynchronous tasks within our Mentor-Management-System-Team-7 project, we integrated *hibiken/asynq* along with Redis. *hibiken/asynq* is a Go library that provides a simple and reliable way to perform background job processing. By leveraging Redis as a message broker, hibiken/asynq enables us to enqueue tasks and process them asynchronously. This allows our application to handle resource-intensive or time-consuming operations without blocking the main execution flow, resulting in improved responsiveness and scalability. With hibiken/asynq, we efficiently manage tasks such as email notifications, data processing, and other background operations in a distributed and fault-tolerant manner.

- **jordan-wright/email**: We utilized the *jordan-wright/email* library, for sending user emails within our Mentor-Management-System-Team-7 project. With this library, we implemented functionality for sending user emails for various purposes, such as email address verification, password resets, and other communication needs. By leveraging this library, we streamlined our email sending process and ensure that important user-related emails are delivered reliably.

- **o1egl/paseto**: We used the *o1egl/paseto* library for session management using Paseto tokens in our Mentor-Management-System-Team-7 project. Paseto is an alternative to JWT tokens and offers several benefits such as being secure by default (including encryption and signature), being resistant to token string manipulation attacks, and providing a simple API for token creation and verification. By using Paseto tokens, we ensured the integrity and security of our session management system.

- **rs/zerolog**: We incorporated the *rs/zerolog* library for robust logging within our Mentor-Management-System-Team-7 project. Zerolog is a powerful logging library that offers high performance and flexibility. It allows us to log messages with different severity levels, structured logging capabilities, and various output formats. By using Zerolog, we  effectively track and debug our application, gain insights into its behavior, and monitor its performance in a structured and efficient manner.

- **spf13/viper**: We integrated the *spf13/viper* library for handling environment variables and configuration management in our Mentor-Management-System-Team-7 project. Viper provides a convenient and flexible way to read, parse, and manage configuration settings from various sources, including environment variables, configuration files, and more. By using Viper, we can easily adapt our application's behavior based on different environments and configuration options.

- **stretchr/testify**: The *stretchr/testify* library is utilized for testing our Mentor-Management-System-Team-7 project. This library provides a rich set of utilities and assertions that make testing in Go more convenient and expressive. It offers features such as assertion functions, mock objects, and test suite setup/teardown capabilities. By using testify, we can write comprehensive and reliable tests to ensure the correctness and stability of our codebase.

- **go.mongodb.org/mongo-driver**: We used the *go.mongodb.org/mongo-driver* library, specifically version 1.11.4, for interacting with MongoDB in our Mentor-Management-System-Team-7 project. This official MongoDB driver for Go provides a high-level API for performing CRUD operations, querying, and other database interactions. With the mongo-driver, we seamlessly connect to our MongoDB database, execute database operations, and handle data persistence efficiently.

- **golang.org/x/oauth2**: The *golang.org/x/oauth2* library was employed for implementing Google Sign-In functionality within our Mentor-Management-System-Team-7 project. This library provides the necessary tools and utilities to handle the OAuth2 flow and authenticate users with their Google accounts. By utilizing this library, we can enable users to securely sign in using their Google credentials, granting them access to our system with the appropriate authorization.

## Deployment
The makefile included in this project provides several helpful commands to simplify the deployment and testing process. Set the [DB_SOURCE]("./app.env") environment variable to a valid Mongo connection string. 

#### Running the server

```bash
make redis
make server
```
will run a Redis container with the name "redis", mapping port 6379, and running in the background. Then compile and run the Go program contained in the file main.go.

#### Test

```bash
make test
```
will run all tests in the current directory and its subdirectories, display verbose output, and generate a coverage report.

## How to contributing to this project:

To get it up and running on your local machine, follow the steps below:

*   Fork this repo following this [guideline](https://docs.github.com/en/get-started/quickstart/fork-a-repo).
*   Clone the repo with the command `git clone`
*   Indicate your interest to work on any issue. "eg. I want to work on this issue or I am interested in this issue"
*   Open a feature branch from the 'develop' branch. eg feat/
*   Make sure the name is descriptive for your branch but not too long. Lead with what the the branch is doing eg new feature or bug but follow this pattern `type/branch-description` eg `feature/add-login-functionality`.
*   Ensure your branch is up to date with latest changes before pushing
*   Create a pull request against develop branch
*   Reference the issue you worked on in your PR
*   Open a pull request against the develop branch and request a review from your

##### Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

<!-- prettier-ignore-start -->

<!-- markdownlint-disable -->

<!-- markdownlint-restore -->

<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-8-orange.svg?style=flat-square)](#contributors)

<!-- ALL-CONTRIBUTORS-BADGE:END -->
