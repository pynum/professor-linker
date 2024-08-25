# ProfLink

ProfLink is an innovative platform designed to help students make well-informed decisions when selecting their professors. By providing detailed, student-driven reviews and ratings, ProfLink offers insights into teaching styles, course delivery, and overall professor performance, helping students choose the best fit for their academic journey.

## Overview

In today's educational environment, access to reliable information about professors can significantly impact a student's academic success. ProfLink serves as a comprehensive resource, allowing students to explore detailed profiles, read real-time feedback, and receive personalized recommendations tailored to their learning preferences.

## Key Features

- **Advanced Search Capabilities:** Effortlessly browse through an extensive database of professor profiles using various filters like department, course, and rating.
- **Comprehensive Professor Profiles:** Access in-depth profiles that include teaching history, student feedback, course ratings, and more.
- **Student-Driven Reviews:** Gain insights from fellow students through detailed reviews and ratings, highlighting strengths, weaknesses, and unique teaching approaches.
- **Real-Time Review Updates:** Stay informed with the latest reviews and ratings, ensuring you have up-to-date information at your fingertips.
- **Personalized Recommendations:** Receive suggestions based on your academic preferences, ensuring you find professors who align with your learning style.

## Technology Stack

- **Frontend:** Built with React and Material-UI (MUI) for a responsive and intuitive user interface.
- **Backend:** Powered by Python and Next.js, ensuring a robust and scalable platform.
- **Authentication:** Integrated with Clerk for secure and seamless user authentication.
- **Data Storage:** Utilizes Pinecone for efficient and reliable data storage, enabling fast access to professor profiles and reviews.

## Getting Started

Follow these steps to set up ProfLink on your local machine:

### Prerequisites

- Ensure you have Node.js and npm installed.
- Make sure you have access to the required API keys for Pinecone, OpenAI, and Clerk.

### Installation

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/your-username/proflink.git
    ```

2. **Navigate to the Project Directory:**

    ```bash
    cd proflink
    ```

3. **Install Dependencies:**

    ```bash
    npm install
    ```

4. **Configure Environment Variables:**

   Create a `.env` file in the root directory and populate it with your API keys:

    ```bash
    PINECONE_API_KEY=your-pinecone-api-key
    OPENAI_API_KEY=your-openai-api-key
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
    CLERK_SECRET_KEY=your-clerk-secret-key
    ```

5. **Start the Development Server:**

    ```bash
    npm run dev
    ```

   The application will be available at `http://localhost:3000`.

## Usage

- **Explore:** Once the application is running, navigate to the home page where you can search for professors by name, department, or course.
- **Review:** If you've taken a class with a professor, contribute by leaving a detailed review to help other students.
- **Get Recommendations:** Based on your interactions and preferences, ProfLink will suggest professors that might be a great match for your upcoming courses.

## Demo

Check out the live demo of ProfLink [here](https://proflink.vercel.app/).

## Contributing

We welcome contributions to enhance ProfLink. Whether it's fixing bugs, adding new features, or improving documentation, your efforts are appreciated. Please fork the repository, create a new branch, and submit a pull request.
---
