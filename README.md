# ProfAdvisor

ProfAdvisor is a platform designed to help students make informed decisions when choosing their professors. With detailed and up-to-date reviews, students can easily find the right professor to match their learning style and academic needs.

## Features

- Search and explore professor profiles
- View ratings and detailed reviews from other students
- Real-time updates on professor reviews
- Personalized recommendations based on user preferences

## Tech Stack

- **Frontend:** React, MUI
- **Backend:** Python, Next.js, OpenAI
- **Authentication:** Clerk
- **Data Storage:** Pinecone

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/profadvisor.git
    ```
2. Navigate to the project directory:
    ```bash
    cd profadvisor
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Create a `.env` file and add the necessary environment variables:
    ```bash
    PINECONE_API_KEY=your-pinecone-api-key
    OPENAI_API_KEY=your-openai-api-key
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
    CLERK_SECRET_KEY=your-clerk-secret-key
    ```
5. Start the development server:
    ```bash
    npm run dev
    ```

## Demo

Check out the live demo [ProfAdvisor](https://profadvisor.vercel.app/).

## Usage

- Visit `http://localhost:3000` in your browser to use the application locally.
- Sign up, search for professors, and start exploring reviews.
