# Contributing to djangoindia.org

First off all, thanks for taking out the time to contribute! ❤️


All type of contributions are encouraged and valued. See the [Table of Contents](#table-of-contents) for different ways to contribute and details about how this project handles them. Please make sure to read the relevant section before making your contribution. It will make it a lot easier for us maintainers and smooth out the experience for all involved. The djangoindia community looks forward to your contributions. 🎉


## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [I Have a Question](#i-have-a-question)
- [I Want To Contribute](#i-want-to-contribute)
- [Setting Up and Running the Project Locally](#setting-up-and-running-the-project-locally)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)
- [Your First Code Contribution](#your-first-code-contribution)
- [Commit Messages](#commit-messages)
- [Join The Djangoindia Team (TBD)](#join-the-djangoindia-team-tbd)
  


## Code of Conduct

This project and everyone participating in it is governed by the
Contributing.md [Code of Conduct](https://github.com/djangoindia/djangoindia.org/blob/main/CODE_OF_CONDUCT.md).

By participating, you are expected to uphold this code. Please report unacceptable behavior
to <admin@djangoindia.org>.


## I Have a Question

> If you want to ask a question, we assume that you have read the available [Documentation]().

Before you ask a question, it is best to search for existing [Issues](https://github.com/djangoindia/djangoindia.org/issues) that might help you. In case you have found a suitable issue and still need clarification, you can write your question in that issue itself. It is also advisable to search the internet for answers first.

If you then still feel the need to ask a question and need clarification, we recommend the following:

- Open an [Issue](https://github.com/djangoindia/djangoindia.org/issues/new).

- Provide as much context as you can about what you're running into.
- Provide project and platform versions (nodejs, npm, etc), depending on what seems relevant.

We will then take care of the issue as soon as possible.

## I Want To Contribute

## Setting Up and Running the Project Locally
1. **Fork the repository:**

    - Read the [documentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) to learn about forking a repository.

2. **Clone the repository:**

    ```
    git clone https://github.com/<your_username>/djangoindia.org
    ```

### Without Docker
  #### Backend (Django)
  We are in root directory right now.

  1.  **Create and activate a virtual environment:**

  - For PowerShell:
      ```
      python -m venv env
      .\env\Scripts\Activate
      ```
  - For Command Prompt:
      ```
      python -m venv env
      env\Scripts\activate
      ```

  2.  **Install the required packages:**
      ```
      make install-backend
      ```

  3.  **Configure the Django settings:**

      - Create a `.env` file in the project root and add necessary environment variables (e.g., SECRET\_KEY, DATABASE\_URL).
      - the ideal env for local setup without docker would look something like(refer to .env.example for latest envs):
        ```
        DJANGO_ADMIN_URL=admin/
        DJANGO_SECRET_KEY=secret_key
        DEBUG=true
        DOCKERIZED=0

        AWS_ACCESS_KEY_ID=id
        AWS_SECRET_ACCESS_KEY=key
        AWS_STORAGE_BUCKET_NAME=bucket
        AWS_S3_REGION_NAME=region

        CELERY_BROKER_URL=amqp://localhost
        CELERY_RESULT_BACKEND=rpc://celery.sqlite3

        DJANGO_SUPERUSER_USERNAME=admin
        DJANGO_SUPERUSER_EMAIL=admin@djangoindia.org
        DJANGO_SUPERUSER_PASSWORD=admin
        ```

  4.  **Run database migrations**:
      ```
      python manage.py migrate
      ```

  5. **Start the Django development server**
      ```
      make runserver
      ```

  #### Frontend (Next.js)

  1.  **Navigate to the frontend directory:**
      ```
      cd frontend
      ```
  2. **Install the required packages:**
      ```
      npm install (or) yarn install
      ```
  3.  **Start the Next.js development server:**
      ```
      npm run dev (or) yarn dev
      ```

### With Docker

1. Install [Docker desktop](https://docs.docker.com/desktop/) as per your operating system.
2. Create a `.env` file and add the environment variables in it.
3. A `.env` for setting up project with docker would look something like this(refer to .env.example for latest envs):
    ```
    DJANGO_ADMIN_URL=admin/
    DJANGO_SECRET_KEY=secret_key
    DEBUG=true
    DOCKERIZED=1

    AWS_ACCESS_KEY_ID=id
    AWS_SECRET_ACCESS_KEY=key
    AWS_STORAGE_BUCKET_NAME=bucket
    AWS_S3_REGION_NAME=region


    CELERY_BROKER_URL=amqp://guest:guest@rabbitmq:5672//
    CELERY_RESULT_BACKEND=db+postgresql://postgres:postgres@postgres:5432/djangoindia-db

    POSTGRES_DB=djangoindia-db
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=postgres
    POSTGRES_HOST=postgres
    POSTGRES_PORT=5432

    DJANGO_SUPERUSER_USERNAME=admin
    DJANGO_SUPERUSER_EMAIL=admin@djangoindia.org
    DJANGO_SUPERUSER_PASSWORD=admin
    ```

4. Then in the root directory run the following command to build and run docker images:
    ```
    docker-compose up --build
    ```
5. After a while, backend will be accessible at `http://localhost:8000` and frontend will be accessible at `http://localhost:3000`.
6. Whatever changes are done in frontend, they will automatically be updated in the docker container but if there is any change in the backend, the image must be rebuilt for those changes to reflect in the docker container.
7. To stop docker containers, run:
    ```
    docker-compose down
    ```
### Reporting Bugs


#### Before Submitting a Bug Report

A good bug report shouldn't leave others needing to chase you up for more information. Therefore, we ask you to investigate carefully, collect information and describe the issue in detail in your report. Please complete the following steps in advance to help us fix any potential bug as fast as possible.

- Make sure that you are using the latest version.
- Determine if your bug is really a bug and not an error on your side e.g. using incompatible environment components/versions (Make sure that you have read the [documentation](). If you are looking for support, you might want to check [this section](#i-have-a-question)).
- To see if other users have experienced (and potentially already solved) the same issue you are having, check if there is not already a bug report existing for your bug or error in the [bug tracker](issues?q=label%3Abug).
- Also make sure to search the internet (including Stack Overflow) to see if users outside of the GitHub community have discussed the issue.
- Collect information about the bug:
- Stack trace (Traceback)
- OS, Platform and Version (Windows, Linux, macOS, x86, ARM)
- Version of the interpreter, compiler, SDK, runtime environment, package manager, depending on what seems relevant.
- Possibly your input and the output
- Can you reliably reproduce the issue? And can you also reproduce it with older versions?


#### How Do I Submit a Good Bug Report?

> You must never report security related issues, vulnerabilities or bugs including sensitive information to the issue tracker, or elsewhere in public.

We use GitHub issues to track bugs and errors. If you run into an issue with the project:

- Open an [Issue](https://github.com/djangoindia/djangoindia.org/issues/new). (Since we can't be sure at this point whether it is a bug or not, we ask you not to talk about a bug yet and not to label the issue.)

- Explain the behavior you would expect and the actual behavior.
- Please provide as much context as possible and describe the *reproduction steps* that someone else can follow to recreate the issue on their own. This usually includes your code. For good bug reports you should isolate the problem and create a reduced test case.
- Provide the information you collected in the previous section.

Once it's filed:

- Our team will label the issue accordingly.

- A team member will try to reproduce the issue with your provided steps. If there are no reproduction steps or no obvious way to reproduce the issue, the team will ask you for those steps and mark the issue as `needs-repro`. Bugs with the `needs-repro` tag will not be addressed until they are reproduced.
- If the team is able to reproduce the issue, it will be marked `needs-fix`, as well as possibly other tags (such as `critical`), and the issue will be left to be [implemented by someone](#your-first-code-contribution).

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for djangoindia.org, **including completely new features and minor improvements to existing functionality**. Following these guidelines will help maintainers and the community to understand your suggestion and find related suggestions.

#### Before Submitting an Enhancement

- Make sure that you are using the latest version.
- Read the [documentation]() carefully and find out if the functionality is already covered, maybe by an individual configuration.
- Perform a [search](https://github.com/djangoindia/djangoindia.org/issues) to see if the enhancement has already been suggested. If it has, add a comment to the existing issue instead of opening a new one.

- Find out whether your idea fits with the scope and aims of the project. It's up to you to make a strong case to convince the project's developers of the merits of this feature. Keep in mind that we want features that will be useful to the majority of our community members and not just a small subset.

#### How Do I Submit a Good Enhancement Suggestion?

Enhancement suggestions are tracked as [GitHub issues](https://github.com/djangoindia/djangoindia.org/issues).


- Use a **clear and descriptive title** for the issue to identify the suggestion.
- Provide a **step-by-step description of the suggested enhancement** in as many details as possible.
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why. At this point you can also tell which alternatives do not work for you.
- You may want to **include screenshots and animated GIFs** which help you demonstrate the steps or point out the part which the suggestion is related to. You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux. 
- **Explain why this enhancement would be useful** to most of our community members. 

### Your First Code Contribution

#### Step-by-Step Guide

1. **Finding an Issue**
   - Browse through the list of open issues on our repository and select one that you'd like to work on.

2. **Fork the Repository**
   - Refer to the "Forking a Repo" section above for detailed instructions on how to fork the repository to your GitHub account.

3. **Setup the Project Locally**
   - Follow the steps in the "Setting Up Locally" section to clone your forked repository and set up the project on your local machine.

4. **Create a New Branch**
   - From the main branch, create a new branch named after the issue number. For example, if the issue number is 24, you can name your branch `issue_24`.
   - Use the following commands(assuming you are on main branch):
     ```sh
     git pull origin main
     git checkout -b issue_24
     ```

5. **Pre-commit Setup**
   - Before making any changes, ensure that `pre-commit` is set up to maintain code quality standards.
   - Install pre-commit hooks with:
     ```sh
     pre-commit install
     ```

6. **Make your changes and test them properly**
   - Implement the required changes and make sure you test them properly.

7. **Stage and Commit Your Changes**
   - Add your changes to the staging area:
     ```sh
     git add .
     ```
   - Commit your changes with a clear and descriptive message. The format should be:
     ```
     Fixed #<issue_number> -- <issue_title>
     ```
   - Example:
     ```sh
     git commit -m "Fixed #24 -- Created contributing.md file"
     ```

8. **Push Your Changes**
   - Push your branch to your forked repository:
     ```sh
     git push origin issue_24
     ```

9. **Create a Pull Request**
   - Navigate to your forked repository on GitHub and create a pull request from your branch to the main branch of the Djangoindia repository.
   - The PR title should follow the format: 
     ```
     Fixed #<issue_number> -- <brief_description>
     ```
   - Example:
     ```
     Fixed #24 -- Created contributing.md file
     ```

10. **PR Review**
    - Wait for the maintainers to review your pull request. Be prepared to make any necessary revisions based on their feedback.

---

### Commit Messages

#### Format of Commit Messages

- **Issue Number**: Include the issue number you're addressing.
- **Description**: Provide a concise description of the change.
- **Example Format**:
  ```
  Fixed #24 -- Created contributing.md file
  ```

### Join The Djangoindia Team (TBD)

If you have any questions or need more information, feel free to reach out to us via email at [admin@djangoindia.org](mailto:admin@djangoindia.org)

## Thank You!
Your contributions are what make open-source projects great. We appreciate your time and effort in making djangoindia.org better for everyone.


